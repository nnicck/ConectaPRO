import Sidebar from "@/components/Sidebar";

export default function solicitacoesProfissional(){
    return(
        <>
        <Sidebar></Sidebar>

        <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                With supporting text below as a natural lead-in to additional content.
                </p>
                <a href="#" className="btn btn-primary">
                Go somewhere
                </a>
            </div>
            </div>
        </div>
        <div className="col-sm-6">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                With supporting text below as a natural lead-in to additional content.
                </p>
                <a href="#" className="btn btn-primary">
                Go somewhere
                </a>
            </div>
            </div>
        </div>
        </div>


        
        
        </>
    )
}