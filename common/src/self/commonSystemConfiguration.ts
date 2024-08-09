// const localServerAddress = "localhost";
const localServerAddress = "192.168.178.26";
// const localServerAddress = "192.168.178.36";
// const localServerAddress = "192.168.178.42";

const backendBaseUrl = `http://${localServerAddress}:8080`;

export const commonSystemConfiguration = {
    frontendBackendBaseUrl: backendBaseUrl + "/frontend",
    authorBackendBaseUrl: backendBaseUrl + "/author",
    contentBaseUrl: `http://${localServerAddress}:3001`,
};
