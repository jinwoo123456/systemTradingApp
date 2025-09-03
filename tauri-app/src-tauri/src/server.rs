use axum::Router;
use crate::state::AppState;
use crate::db::db_conn::db_connect;
use crate::router::build_router;

pub async fn serve_axum() -> anyhow::Result<()> {
    // DB 연결 및 상태 구성
    let db = db_connect().await?;
    let state = AppState { db };

    // 라우터 구성
    let app: Router = build_router(state);

    // 서버 실행
    let addr: std::net::SocketAddr = "127.0.0.1:3000".parse().unwrap();
    let listener = tokio::net::TcpListener::bind(addr).await?;
    println!("악숨 실행중 :  http://{addr}");
    axum::serve(listener, app).await?;
    Ok(())
}