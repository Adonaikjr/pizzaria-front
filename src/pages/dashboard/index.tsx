import { yesAuth } from "../../utils/yesAuth"

export default function Dashboard() {
    return (
        <div>
            <h1>dashboard</h1>
        </div>
 )
}

export const getServerSideProps = yesAuth(async (ctx) => {
    return {
        props:{}
    }
} )