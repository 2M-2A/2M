# App móvil 2M

Proyecto base multiplataforma Android/iOS. La PC ejecuta `servidor_movil.py` y el teléfono se conecta por la misma red local.

En Android se puede compilar con Buildozer desde Linux/WSL. iOS requiere macOS + Xcode. El módulo de cámara/lector de códigos se deja preparado para integrar ZBar/ML Kit en la fase de compilación móvil; la lógica de inventario, selección y reconexión ya está separada.

La app conserva el progreso local cuando pierde la conexión y la PC permite un único celular conectado.
