export const sendMessage = async (data: any) => fetch('/api/message', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});