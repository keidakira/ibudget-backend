class ApiResponse {
    status = 200;
    error = false;
    message = "";
    data: any = null;

    public json() {
        return {
            error: this.error,
            message: this.message,
            data: this.data,
        };
    }
}

export default ApiResponse;