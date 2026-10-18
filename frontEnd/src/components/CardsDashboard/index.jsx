export default function CardsDashboard({titCardDashboard, numDashboard}){
    return(
    <>
    <div className="card mt-5" style={{ width: "18rem" }}>
    <div className="card-body d-flex flex-column align-items-center ">
        <h5 className="card-title">{titCardDashboard}</h5>
        <h2>{numDashboard}</h2>
        <p className="card-text">Ver mais sobre</p>
    </div>
    </div>
    
    
    </>
    );
}