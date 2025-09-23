import { useEffect, useState } from "react"



function PaginationOne() {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)

    const fetchProducts = async () => {
        const res = await fetch('https://dummyjson.com/products?limit=100')
        const data = await res.json()
        console.log(data)
        if (data && data.products) {
            setProducts(data.products)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 &&
            selectedPage <= products.length / 10 &&
            selectedPage !== page
        ) {
            setPage(selectedPage)
        }
    }




    return (
        <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6'>
            {products.length > 0 && <div className="m-5 p-0 flex flex-wrap gap-1">
                {
                    products.slice(page * 10 - 10, page * 10).map((product) => {
                        return <span className="w-30 shadow-lg p-4 " key={product.id}>
                            <img src={product.thumbnail} alt='' className="h-30" />
                            {product.title}
                        </span>
                    })
                }
            </div>
            }
            {
                products.length > 0 && <div className="my-4 p-2.5 flex justify-center gap-1">
                    <span className={`py-4 px-5 bg-amber-200 shadow-lg cursor-pointer ${page <= 1 && 'invisible'}`}
                        onClick={() => selectPageHandler(page - 1)}>⬅️</span>
                    <span className="flex justify-center gap-1">
                        {
                            [...Array(products.length / 10)].map((_, i) => <span
                                className={`py-4 px-5  shadow-lg cursor-pointer ${page === i + 1 ? 'bg-gray-500' : 'bg-amber-200'}`}
                                key={i}
                                onClick={() => selectPageHandler(i + 1)}
                            >{i + 1}</span>)
                        }
                    </span>
                    <span className={`py-4 px-5 bg-amber-200 shadow-lg cursor-pointer ${page >= products.length / 10 && 'invisible'}`} onClick={() => selectPageHandler(page + 1)}>➡️</span>
                </div>
            }
        </div>
    )
}

export default PaginationOne
