use axum::{Json, extract::State};
use serde::{Deserialize, Serialize};
use crate::state::AppState;


#[derive(Serialize, Deserialize, Debug)]
pub struct SignupReq { pub name: String, pub email: String, pub phone: String, pub password: String }


#[derive(Serialize, Deserialize, Debug)]
pub struct SignupOut { pub tag: i64, pub name: String, pub email: String, pub phone: String }


pub async fn health(State(_state): State<AppState>) -> &'static str { "ok" }

pub async fn signup(State(_state): State<AppState>, Json(req): Json<SignupReq>) -> Json<SignupOut> {
    // [받는 곳] 클라이언트가 POST /auth/signup로 보낸 JSON 데이터를 SignupReq 구조체로 받음
    // [보내는 곳] SignupOut 구조체를 JSON으로 응답
    // 비번 뺴고 돌려주기
    // tag 1 : 성공 tag 9 : 실패
    println!("받은 값 : {:?}", req);
    Json(SignupOut { tag: 1, name: req.name, email: req.email, phone: req.phone  })
}

