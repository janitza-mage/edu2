const localServerAddress = "localhost";
// const localServerAddress = "192.168.178.26";

const backendBaseUrl = `http://${localServerAddress}:8080`;

export const commonSystemConfiguration = {
    frontendBackendBaseUrl: backendBaseUrl + "/frontend",
    authorBackendBaseUrl: backendBaseUrl + "/author",
    contentBaseUrl: `http://${localServerAddress}:3001`,
};
