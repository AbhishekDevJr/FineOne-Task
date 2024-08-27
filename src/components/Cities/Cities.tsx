import { useEffect } from "react"

function Cities() {
    useEffect(() => {
        throw new Error('Error Boundary Test.');
    }, []);
    return (
        <div className="container-cities">
            Cities Component
        </div>
    )
}

export default Cities