import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

const AllEvents = () => {
  const [searchkey, setsearchkey] = useState('')
  const [allevents, setallevents] = useState([])
  const [filterditems, setfiltereditems] = useState([]);
  const [date, setdate] = useState('')
  useEffect(() => {
    initialfetch()
  }, [])

  useEffect(() => {
    const filtered = allevents.filter((event) =>
      event.event_title.toLowerCase().includes(searchkey.toLowerCase())
    );
    console.log(filtered);

    setfiltereditems(filtered);
  }, [searchkey, allevents]);

  useEffect(() => {
  
    const filtered = allevents.filter((event) =>
      event.event_date===date)
    ;
    console.log(filtered);

    setfiltereditems(filtered);
  }, [date, allevents]);


  
  const handleSearch = (event) => {
    const value = event.target.value;
    setsearchkey(value);
  };
  const handledate = (event) => {
    setdate(event.target.value)
    console.log(date)
  }
  const initialfetch = async () => {
    try {
      const res = await fetch('http://localhost:5000/event/allevents')
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        console.log(data.error)
        return
      }
      setallevents(data)
      return
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='mt-16 flex flex-col gap-5'>
      <div className="flex flex-col gap-3 items-center">
        <h2 className='text-xl font-semibold'>search</h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <input type="text" placeholder="search by event name" onChange={handleSearch}
            value={searchkey} className=" px-2 py-1 bg-gray-50
          border rounded border-gray-600 sm:w-60" />
          <input type="date" name="" onChange={handledate} value={date} id="" />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 px-4">
        {/* {allevents.map((event, i) => (<Card data={event} key={i} />))} */}
        {filterditems.length > 0
            ? filterditems.map((product,i) => (
                <Card key={i} data={product} />
              ))
            : allevents.map((product,i) => (
                <Card key={i} data={product} />
              ))}
      </div>
    </div>
  )
}

export default AllEvents
