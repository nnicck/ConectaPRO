import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EtapasContaProfissonal from "@/components/EtapasContaProfissional";
import BarraNavegacao from "@/components/BarraNavegacao";

export default function CadastroProfissional() {
  const inputStyle = {
    height: "48px",
    borderRadius: "6px",
    border: "1px solid #c9d7e6",
    fontSize: "16px",
    backgroundColor: "#fff",
  };

  const etapaAtiva = {
    width: "70px",
    height: "70px",
    backgroundColor: "#2864e8",
  };

  const etapaInativa = {
    width: "70px",
    height: "70px",
    backgroundColor: "#dedede",
  };

  return (
    <>
    <header>
        <BarraNavegacao botaoUm="Cadastre-se" botaoDois="Cadastre-se como profissional" botaoTres="Entrar"></BarraNavegacao>
    </header>
    
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "#f6f8fa",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div className="container-fluid px-4 px-md-5 mt-5">

        {/* VOLTAR */}
        <div>
          <button
            type="button"
            className="btn p-0 border-0 shadow-none"
            style={{
              fontSize: "42px",
              lineHeight: "1",
              color: "#000",
            }}
          >
            ←
          </button>
        </div>

        <EtapasContaProfissonal></EtapasContaProfissonal>

        {/* CONTEÚDO */}
        <div className="d-flex justify-content-center align-itens-center row mt-5">


          <div>
                <p className="text-center">Foto de perfil</p>
                <div className="d-flex justify-content-center align-itens-center flex-columns">
                
                <img
                    id="selectedAvatar"
                    src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
                    className="rounded-circle"
                    style={{ width: 200, height: 200, objectFit: "cover" }}
                    alt="example placeholder"
                />
                </div>
                <div className="d-flex justify-content-center mt-2">
                <div data-mdb-ripple-init="" className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile2">
                    Choose file
                    </label>
                    <input
                    type="file"
                    className="form-control d-none"
                    id="customFile2"
                    onchange="displaySelectedImage(event, 'selectedAvatar')"
                    />
                </div>
                </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="col-12 col-md-8">

                <form>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Nome</label>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    id="formGroupExampleInput"
                    placeholder="Example input"
                    />
                </div>
         
                <div className="form-group mt-4">
                    <label htmlFor="formGroupExampleInput2">E-mail</label>
                    <input
                    type="email"
                    className="form-control form-control-lg"
                    id="formGroupExampleInput2"
                    placeholder="Another input"
                    />
                </div>

                <div className="d-flex align-items-center justify-content-start gap-5 mt-4">
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Telefone</label>
                        <input
                        type="phone"
                        className="form-control form-control-lg"
                        id="formGroupExampleInput"
                        placeholder="Example input"
                        />
                    </div>
            
                    <div className="form-group ">
                        <label htmlFor="formGroupExampleInput2">Data de Nascimento</label>
                        <input
                        type="date"
                        className="form-control form-control-lg"
                        id="formGroupExampleInput2"
                        placeholder="Another input"
                        />
                    </div>
                </div>
                <button className="btn btn-primary w-100 mt-5">Continuar</button>
              </form>

            </div>
          </div>
        </div>

    </div>
    </>
  );
}