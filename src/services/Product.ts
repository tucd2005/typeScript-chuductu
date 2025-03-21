import { IProduct } from "../types/product";
import instanceAxios from "../ultis/configAxios";

const getAllProduct = async (): Promise<IProduct[] | void> => {
    try {
        const { data } = await instanceAxios.get("/products");
        return data;
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async (product: Omit<IProduct, "id">) => {
    try {
        const { data } = await instanceAxios.post<IProduct>("/products", product);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (id:number,product: IProduct) => {
    try {
        const { data } = await instanceAxios.put<IProduct>(`/products/${id}`, product);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (id: number) => {
    try {
        const { data } = await instanceAxios.get<IProduct>(`/products/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (id: number) => {
    try {
        const { data } = await instanceAxios.delete<IProduct>(`/products/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const productServices = {
    getAllProduct,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
}