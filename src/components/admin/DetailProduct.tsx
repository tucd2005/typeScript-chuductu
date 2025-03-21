import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productServices } from "../../services/Product";
import { IProduct } from "../../types/product";

const DetailProduct = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams();

  const getProductById = async () => {
    const data = await productServices.getProductById(Number(id));
    if (data) setProduct(data);
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="w-full mb-1">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  >
                    <svg
                      className="w-5 h-5 mr-2.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="ml-1 text-sm font-medium text-gray-400 md:ml-2"
                      aria-current="page"
                    >
                      Products
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All products
            </h1>
          </div>
          <div className="items-center block sm:flex md:divide-x md:divide-gray-100">
            <form className="mb-4 sm:pr-3 sm:mb-0" action="#" method="GET">
              <label className="sr-only">Search</label>
              <div className="relative mt-1 sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="email"
                  id="products-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Search for products"
                />
              </div>
            </form>
            <div className="flex items-center w-full sm:justify-end">
              <button
                type="button"
                data-modal-toggle="add-product-modal"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 sm:ml-auto"
              >
                <svg
                  className="w-6 h-6 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 my-4 xl:gap-4">
        <div className="h-full p-4 mb-4 bg-white rounded-lg shadow sm:p-6">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product-Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product?.name}
                  </th>
                  <td className="px-6 py-4">{product?.productCode}</td>
                  <td className="px-6 py-4">{product?.price}</td>
                  <td className="px-6 py-4">
                    <img className="w-20" src={product?.image} alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
