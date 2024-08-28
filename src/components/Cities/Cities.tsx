import { useEffect } from "react"

//This component is used to throw mock error to test ErrorBoundary
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