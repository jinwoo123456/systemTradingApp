#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod web;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|_app| {
            tauri::async_runtime::spawn(async {
                if let Err(e) = web::serve_axum().await {
                    eprintln!("Axum server error: {e:?}");
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
