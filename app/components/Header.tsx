import Link from "next/link"

const Header = () => {
  return (
    <header className="header">
        <div className="container">
            <div className="logo">
                {/* <h3>Header Component</h3> */}
                <Link href="/">Home</Link>
            </div>
            <div className="links">
                <Link href="/about">About</Link>
                <Link href="/code">Code</Link>
                <Link href="/team">Team</Link>
            </div>
        </div>
    </header>
  )
}

export default Header