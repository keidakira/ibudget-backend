class ApiResponse {
    status = 200;
    error = false;
    message = "";
    data: object | null = null;

    public json() {
        return {
            error: this.error,
            message: this.message,
            data: this.data,
        };
    }
}

export default ApiResponse;