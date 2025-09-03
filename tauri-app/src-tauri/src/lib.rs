#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod server;
pub mod db;
pub mod state;
pub mod router;
pub mod controller;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|_app| {
            tauri::async_runtime::spawn(async {
                if let Err(e) = server::serve_axum().await {
                    eprintln!("Axum server error: {e:?}");
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
