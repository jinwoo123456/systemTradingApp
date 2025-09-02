use axum::{routing::{get, post}, Router, Json};
use serde::{Deserialize, Serialize};
use tower_http::cors::{CorsLayer, Any};
use std::net::SocketAddr;


#[derive(Serialize, Deserialize, Debug)]
struct SignupReq { name: String, email: String, phone: String, password: Option<String> }


#[derive(Serialize, Deserialize, Debug)]
struct SignupOut { id: i64, name: String, email: String, phone: String }


async fn health() -> &'static str { "ok" }

async fn signup(Json(req): Json<SignupReq>) -> Json<SignupOut> {
    // [받는 곳] 클라이언트가 POST /auth/signup로 보낸 JSON 데이터를 SignupReq 구조체로 받음
    // [보내는 곳] SignupOut 구조체를 JSON으로 응답
    // 비번 뺴고 돌려주기
    println!("받은 값 : {:?}", req);
    Json(SignupOut { id: 1, name: req.name, email: req.email, phone: req.phone  })
}

pub async fn serve_axum() -> anyhow::Result<()> {
    // cors처리 (임시로 Any)
    let cors = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin(Any);

    // 라우터
    let app = Router::new()
        .route("/auth/signup/health", get(health))
        .route("/auth/signup", post(signup))
        .layer(cors);

    let addr: SocketAddr = "127.0.0.1:3000".parse().unwrap();
    let listener = tokio::net::TcpListener::bind(addr).await?;
    println!("악숨 실행중 :  http://{addr}");
    axum::serve(listener, app).await?;
    Ok(())
}