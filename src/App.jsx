import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
// This function mocks a simple synchronous API to fetch the label list by keyword.
// Example:
//  const val = getLabels('C');
//  console.log(val);
function getLabels(keyword) {
	const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
  const result = allLabels
    .filter(function(x) {
      return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
  return result;
}

// This function mocks the asynchronous API to fetch the label list by keyword.
// Example:
//  getLabelsAsync('C').then(function(val) {
//     console.log(val);
//  })
function getLabelsAsync(keyword) {
	const result = getLabels(keyword);
  const delay = Math.random() * 800 + 200; // delay 200~1000ms
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay, result);
  });
}

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [labelList, setLabelList] = useState([])

  const inputRef = useRef(null);

  const handleOnChange= (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    }

    const handleClickOnLabel = ( label) => {
      const inputText = search.split('@', 2)
      const finalInput = inputText[0] + ' ' + label;
      setSearch(finalInput)
      setLabelList(undefined)
      inputRef.current.focus();

      }

  useEffect(() => {
    const inputText = search.split('@', 2)

    if (inputText[1]?.length >= 0) {
        setLoading(true)
        const getData = async () => {
        const data = await getLabelsAsync(inputText[1]);
       setLabelList(data)
       setLoading(false)

      }
      getData()
    }

}, [search]);

  return (
    <>
      <input type='text' value={search} ref={inputRef} onChange={handleOnChange}></input>
      <div>
        {loading && <div>Loading...</div>}
        {!loading && labelList && labelList.map((label, index) =>
          <li key={index} onClick={() => handleClickOnLabel(label)}>{label}</li>
        )}
      </div>
    </>
  )
}

export default App
