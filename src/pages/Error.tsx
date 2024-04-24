import { FC } from "react"
import img from '../assets/404.png'
import { Link } from "react-router-dom"


const ErrorPage: FC = () => {
    return (
        <div>
            <img src={img} alt="404" />
            <Link to={'/'}>Back</Link>
        </div>
    )
}

export default ErrorPage