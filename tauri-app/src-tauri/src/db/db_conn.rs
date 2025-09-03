use std::time::Duration;
use sea_orm::{ConnectOptions, Database, DatabaseConnection};
use dotenvy::dotenv;

pub async fn db_connect() -> anyhow::Result<DatabaseConnection> {
    dotenv().ok();

    let db_url = dotenvy::var("DATABASE_URL")
        .expect("db url 세팅 안되어있음.");

    let mut opt = ConnectOptions::new(db_url);
    opt.max_connections(20)              //최대 연결 개수
        .min_connections(5)              //최소 연결 개수
        .connect_timeout(Duration::from_secs(8)) //연결 시도 시간
        .acquire_timeout(Duration::from_secs(8)) //풀에서 가져올 때 대기
        .idle_timeout(Duration::from_secs(600))  //놀고 있는 연결 정리 시간
        .sqlx_logging(true); //SQL 로그 출력


    let db = match Database::connect(opt).await {
    Ok(conn) => {
        println!("db 연결 성공");
        conn},
    Err(e) => return Err(anyhow::Error::new(e).context("db 연결 실패")),
    };
    
    Ok(db)
}