use axum::{routing::{get, post}, Router, Json};
use serde::{Deserialize, Serialize};
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;


#[derive(Deserialize, Debug)]
struct SignupReq { name: String, email: String, phone: String, password: String }


#[derive(Serialize, Deserialize, Debug)]
struct SignupOut { id: i64, name: String, email: String, phone: String }


async fn health() -> &'static str { "ok" }

async fn signup(Json(req): Json<SignupReq>) -> Json<SignupOut> {
    // 비번 뺴고 돌려주기
    Json(SignupOut { id: 1, name: req.name, email: req.email, phone: req.phone  })
}

pub async fn serve_axum() -> anyhow::Result<()> {
    let cors = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin(Any);

    let app = Router::new()
        .route("/auth/signup/health", get(health))
        .route("/auth/signup", post(signup))
        .layer(cors);

    let addr: SocketAddr = "127.0.0.1:3000".parse().unwrap();
    let listener = tokio::net::TcpListener::bind(addr).await?;
    println!("Axum running on http://{addr}");
    axum::serve(listener, app).await?;
    Ok(())
}