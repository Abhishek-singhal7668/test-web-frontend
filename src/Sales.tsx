export async function getAllUsers() {
    try{
        const response = await fetch('/api/v1/brand_sales_daily');
        console.log(response);
        return await response.json();
    }catch(error) {
        return [];
    }
}

export async function createUser(data: any) {
    console.log(data);
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
      })
    return await response.json();
}