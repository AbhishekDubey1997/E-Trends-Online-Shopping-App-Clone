import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { toast } from 'react-toastify'
import {collection , orderBy, Timestamp , query , addDoc , onSnapshot,getDocs, QuerySnapshot, setDoc, doc, deleteDoc} from 'firebase/firestore'
import {fireDB} from '.././firebase/FirebaseConfig'



const MyState = (props) => {

  const[mode,setMode] = useState('light')
  

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = 'rgb(17,24,39)'
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white'
    }
  }

  const [loading , setLoading] = useState(false);

  const [products , setProducts] =useState({
    title:null,
    price:null,
    imageUrl:null,
    category:null,
    description:null,
    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US',{
      month:'short',
      day:'2-digit',
      year:'numeric',
    })
  })

  const addProduct = async()=>{
      if(products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null){
        return toast.error('All field are Required')
      }
      setLoading(true)
      try {

        const productRef = collection(fireDB , 'products')

        await addDoc(productRef,products)
        toast.success('Add product Successfully')
        setTimeout(()=>{
          window.location.href='/dashboard'
        },800)
        getProductData()
        setLoading(false)

      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  }

  const [product , setProduct] = useState([])

  const getProductData = async () =>{

    setLoading(true)
    try {
      
      const q = query(
        collection(fireDB , 'products'),
        orderBy('time')
        );

        const data = onSnapshot(q,(QuerySnapshot)=>{
          let productArray = [];
          QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data() , id: doc.id})
          })
          setProduct(productArray)
          setLoading(false)
        })
        return()=> data

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(()=>{
    getProductData()
  },[])


  //update product function

  const edithandle = (item)=>{
    setProducts(item)
  }

  const updateProduct = async()=>{
    setLoading(true)
       try {
         await setDoc(doc(fireDB , 'products' , products.id) , products);
         toast.success('Product Update SuccessFully')
         getProductData()
         setTimeout(()=>{
          window.location.href = '/dashboard'
         },800)
         setLoading(false)

       } catch (error) {
        console.log(error);
        setLoading(false)
       }
  }

  const deleteproduct = async(item)=>{
    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, 'products' , item.id))
      toast.success('Product Delete Successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

 

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
    getOrderData()

  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  
  return (
    <MyContext.Provider value={{mode,toggleMode , loading , setLoading , products , setProducts , addProduct ,product , updateProduct , deleteproduct , edithandle , order , user ,searchkey, setSearchkey,filterType, setFilterType,filterPrice, setFilterPrice }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState
