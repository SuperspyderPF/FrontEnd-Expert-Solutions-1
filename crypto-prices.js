import React, {useState,useEffect} from 'react';

const CRYPTO_PRICES_API_BASE_URL =
  'https://api.frontendexpert.io/api/fe/cryptocurrencies';
  
export default function CryptoPrices() {
  // Write your code here.
  const [data,setData]=useState({});
  const [page,setPage]=useState(0)
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await fetch(`${CRYPTO_PRICES_API_BASE_URL}?page=${page}`)
        const data = await response.json();
        setData(data);
      } catch(error){
        console.error(error)
      }
    }
    fetchData()
  }, [page])
  const firstPage=page===0
  const lastPage=data?.hasNext===false;

  return (
    <>
      <table>
        <caption>Crypto Prices</caption>
        <tr>
          <th>Coin</th>
          <th>Price</th>
          <th>Market Cap</th>

        </tr>
        {data?.coins?.map((coin)=>{
      return(
        <tr>
          <th>{coin.name}</th>
          <td>{coin.price}</td>
          <td>{coin.marketCap}</td>
        </tr>
      )
        })}
      </table>
      <button disabled={firstPage} onClick={()=>setPage(page-1)}>Back</button>
      <button disabled={lastPage} onClick={()=>setPage(page+1)}>Next</button>
    </>
  );
}