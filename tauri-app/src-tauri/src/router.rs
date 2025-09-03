use axum::{Router, routing::{get, post}};
use tower_http::cors::{Any, CorsLayer};
use crate::state::AppState;
use crate::controller::user::{health, signup};

// 임시로 any 처리
pub fn build_router(state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin(Any);

    Router::new()
        .route("/auth/signup/health", get(health))
        .route("/auth/signup", post(signup))
        .with_state(state)
        .layer(cors)
}
