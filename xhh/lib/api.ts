export const sendMessage = async (data: any) => fetch('/api/message', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});

export const sendOrder = async (data: any) => fetch('/api/order', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});