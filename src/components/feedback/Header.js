function Header({ a, b, c }) {
  const col = {
    color: b,
    backgroundColor: c,
  }
  return (
    <header>
      <div className='container'>
        <h2>feedback</h2>
      </div>
    </header>
  )
}

export default Header



