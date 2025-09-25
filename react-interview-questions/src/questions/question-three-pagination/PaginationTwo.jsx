import { useEffect, useState } from "react"



function PaginationTwo() {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const fetchProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
        const data = await res.json()
        if (data && data.products) {
            setProducts(data.products)
            setTotalPages(Math.ceil(data.total / 10))
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [page])

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 &&
            selectedPage <= totalPages &&
            selectedPage !== page
        ) {
            setPage(selectedPage)
        }
    }




    return (
        <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6'>
            {products.length > 0 && <div className="m-5 p-0 flex flex-wrap gap-1">
                {
                    products.map((product) => {
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
                    <span className="flex justify-center gap-1 flex-wrap">
                        {
                            [...Array(totalPages)].map((_, i) => <span
                                className={`py-4 px-5  shadow-lg cursor-pointer ${page === i + 1 ? 'bg-gray-500' : 'bg-amber-200'}`}
                                key={i}
                                onClick={() => selectPageHandler(i + 1)}
                            >{i + 1}</span>)
                        }
                    </span>
                    <span className={`py-4 px-5 bg-amber-200 shadow-lg cursor-pointer ${page >= totalPages && 'invisible'}`} onClick={() => selectPageHandler(page + 1)}>➡️</span>
                </div>
            }
        </div>
    )
}

export default PaginationTwo
