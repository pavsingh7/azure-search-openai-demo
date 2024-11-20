import React, { useState, ChangeEvent } from "react";
import { Callout, Label, Text } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import { Add24Regular, Delete24Regular, ArrowUpload24Regular } from "@fluentui/react-icons";
import { useMsal } from "@azure/msal-react";
import { useTranslation } from "react-i18next";

import { SimpleAPIResponse, uploadFileApi, deleteUploadedFileApi, listUploadedFilesApi } from "../../api";
import { useLogin, getToken } from "../../authConfig";
import styles from "./UploadFile.module.css";

interface Props {
    className?: string;
    disabled?: boolean;
}

export const UploadFile: React.FC<Props> = ({ className, disabled }: Props) => {
    // Change this line to force callout to be visible
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [deletionStatus, setDeletionStatus] = useState<{ [filename: string]: "pending" | "error" | "success" }>({});
    const [uploadedFile, setUploadedFile] = useState<SimpleAPIResponse>();
    const [uploadedFileError, setUploadedFileError] = useState<string>();
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const { t } = useTranslation();

    if (!useLogin) {
        throw new Error("The UploadFile component requires useLogin to be true");
    }

    const client = useMsal().instance;

    // Temporarily modify this handler to do nothing (optional)
    const handleButtonClick = async () => {
        setIsCalloutVisible(!isCalloutVisible); // Toggle the Callout visibility

        // Update uploaded files by calling the API
        try {
            const idToken = await getToken(client);
            if (!idToken) {
                throw new Error("No authentication token available");
            }
            listUploadedFiles(idToken);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const listUploadedFiles = async (idToken: string) => {
        listUploadedFilesApi(idToken).then(files => {
            setIsLoading(false);
            setDeletionStatus({});
            setUploadedFiles(files);
        });
    };

    const handleRemoveFile = async (filename: string) => {
        setDeletionStatus({ ...deletionStatus, [filename]: "pending" });

        try {
            const idToken = await getToken(client);
            if (!idToken) {
                throw new Error("No authentication token available");
            }

            await deleteUploadedFileApi(filename, idToken);
            setDeletionStatus({ ...deletionStatus, [filename]: "success" });
            listUploadedFiles(idToken);
        } catch (error) {
            setDeletionStatus({ ...deletionStatus, [filename]: "error" });
            console.error(error);
        }
    };

    // Handler for the form submission (file upload)
    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setIsUploading(true); // Start the loading state
        const file: File = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const idToken = await getToken(client);
            if (!idToken) {
                throw new Error("No authentication token available");
            }
            const response: SimpleAPIResponse = await uploadFileApi(formData, idToken);
            setUploadedFile(response);
            setIsUploading(false);
            setUploadedFileError(undefined);
            listUploadedFiles(idToken);
        } catch (error) {
            console.error(error);
            setIsUploading(false);
            setUploadedFileError(t("upload.uploadedFileError"));
        }
    };

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <div>
                <Button id="calloutButton" icon={<ArrowUpload24Regular />} disabled={disabled} onClick={handleButtonClick}>
                    {"Personal File Uploads"}
                </Button>

                {isCalloutVisible && (
                    <Callout
                        role="dialog"
                        gapSpace={0}
                        className={styles.callout}
                        target="#calloutButton"
                        onDismiss={() => setIsCalloutVisible(false)}
                        setInitialFocus
                    >
                        <form encType="multipart/form-data">
                            <div>
                                <h3>{"Upload a New File"}</h3>
                                <input
                                    accept=".txt, .md, .json, .png, .jpg, .jpeg, .bmp, .heic, .tiff, .pdf, .docx, .xlsx, .pptx, .html"
                                    className={styles.chooseFiles}
                                    type="file"
                                    onChange={handleUploadFile}
                                />
                            </div>
                        </form>

                        {/* Show loading spinner and message while files are being uploaded */}
                        <div style={{ marginTop: "10px" }} />
                        {isUploading && (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div className={styles.loadingSpinner} />
                                <Text>{t("upload.uploadingFiles")}</Text>
                            </div>
                        )}
                        {!isUploading && uploadedFileError && <Text>{uploadedFileError}</Text>}
                        {!isUploading && uploadedFile && <Text>{uploadedFile.message}</Text>}
                        <div style={{ marginTop: "0px" }} />

                        {/* Display the list of already uploaded */}
                        <h3>{"Uploaded Files:"}</h3>

                        {isLoading && (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div className={styles.loadingSpinner} />
                                <Text>{t("upload.loading")}</Text>
                            </div>
                        )}
                        {!isLoading && uploadedFiles.length === 0 && <Text>{t("upload.noFilesUploaded")}</Text>}
                        {uploadedFiles.map((filename, index) => {
                            return (
                                <div key={index} className={styles.list}>
                                    <div className={styles.item}>{filename}</div>
                                    {/* Button to remove a file from the list */}
                                    <Button
                                        icon={
                                            deletionStatus[filename] === "pending" ? (
                                                <div className={styles.loadingSpinner} style={{ width: "16px", height: "16px" }} />
                                            ) : (
                                                <Delete24Regular />
                                            )
                                        }
                                        onClick={() => handleRemoveFile(filename)}
                                        disabled={deletionStatus[filename] === "pending" || deletionStatus[filename] === "success"}
                                    >
                                        {!deletionStatus[filename] && t("upload.deleteFile")}
                                        {deletionStatus[filename] == "pending" && t("upload.deletingFile")}
                                        {deletionStatus[filename] == "error" && t("upload.errorDeleting")}
                                        {deletionStatus[filename] == "success" && t("upload.fileDeleted")}
                                    </Button>
                                </div>
                            );
                        })}
                    </Callout>
                )}
            </div>
        </div>
    );
};
