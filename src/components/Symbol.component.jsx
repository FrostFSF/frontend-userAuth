const Symbol = ({ classStyle, symbolName, clickEvent }) => {
  return (
    <i className={`fi fi-rr-${symbolName} ${classStyle}`} onClick={clickEvent}></i>
  )
}

export default Symbol
