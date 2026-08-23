
"""App Android/iOS de 2M.
Conecta con la PC por la misma red local. El progreso se conserva localmente
cuando se pierde la conexión y se sincroniza al volver.
"""
import json, os, threading
from urllib.request import Request, urlopen
from kivy.app import App
from kivy.clock import Clock
from kivy.properties import StringProperty, NumericProperty
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.progressbar import ProgressBar
from kivy.uix.textinput import TextInput
try:
    from kivy_garden.zbarcam import ZBarCam
    ZBAR_OK=True
except Exception:
    ZBAR_OK=False

LOCAL="progreso_2m.json"

class Root(BoxLayout):
    estado=StringProperty("Desconectado")
    direccion=StringProperty("")
    progreso=NumericProperty(0)
    def __init__(self,**kw):
        super().__init__(orientation="vertical",padding=15,spacing=10,**kw)
        self.add_widget(Label(text="2M",font_size=32,size_hint_y=None,height=60))
        self.ip=TextInput(hint_text="IP de la PC (ej. 192.168.1.20)",multiline=False,size_hint_y=None,height=45)
        self.add_widget(self.ip)
        self.add_widget(Button(text="Conectar a inventario",size_hint_y=None,height=50,on_press=lambda *_:self.conectar()))
        self.estado_lbl=Label(text=self.estado)
        self.add_widget(self.estado_lbl)
        self.add_widget(Button(text="INVENTARIO",size_hint_y=None,height=55,on_press=lambda *_:self.inventario()))
        self.add_widget(Button(text="Registrar producto / editar conteo del día",size_hint_y=None,height=50,on_press=lambda *_:self.registrar()))
        self.add_widget(Button(text="Escanear código de barras",size_hint_y=None,height=50,on_press=lambda *_:self.escanear()))
        self.lista=Label(text="Sin datos",halign="left",valign="top")
        self.add_widget(self.lista)
        self.pb=ProgressBar(max=100,value=0,size_hint_y=None,height=25); self.add_widget(self.pb)
        self.add_widget(Button(text="Desconectar",size_hint_y=None,height=45,on_press=lambda *_:self.desconectar()))
        self.cargar_local()
    def base(self): return "http://"+self.ip.text.strip()+":8765"
    def req(self,path,method="GET",data=None):
        try:
            body=None if data is None else json.dumps(data).encode()
            r=urlopen(Request(self.base()+path,data=body,method=method,headers={"Content-Type":"application/json"}),timeout=3)
            return json.loads(r.read().decode())
        except Exception as e:
            self.estado="Sin conexión"
            self.estado_lbl.text=self.estado
            return None
    def conectar(self):
        r=self.req("/api/conectar","POST",{})
        if r and r.get("ok"):
            self.estado="Conectado a 2M"; self.estado_lbl.text=self.estado; self.inventario()
        elif r:self.estado=r.get("error","No se pudo conectar"); self.estado_lbl.text=self.estado
    def inventario(self):
        r=self.req("/api/inventario")
        if not r:return
        inv=r.get("inventario")
        if not inv:
            self.lista.text="La PC todavía no eligió Diario Total ni Inter Diario."
            return
        productos=r.get("productos",{})
        self.lista.text="Modo: %s\nProductos: %s\n\nPulsa aquí para escanear/registrar."%(inv.get("modo",""),len(productos))
    def registrar(self):
        self.estado_lbl.text="Listo para registrar o editar el conteo del día."
        if self.lista.text=="Sin datos":
            self.inventario()
    def escanear(self):
        if not ZBAR_OK:
            self.estado_lbl.text="Lector no instalado en esta compilación móvil."
            return
        self.cam=ZBarCam()
        self.clear_widgets()
        self.add_widget(self.cam)
        self.cam.bind(symbols=self._barcode)
    def _barcode(self, cam, symbols):
        if symbols:
            code=symbols[0].data.decode("utf8","ignore")
            self.estado_lbl.text="Código detectado: "+code
            self.req("/api/conteo","POST",{"codigo":code,"cantidad":0})
            self.remove_widget(cam)
            self.add_widget(Label(text="Código: "+code+"\\nAhora coloque la cantidad.",font_size=22))
            self.add_widget(Button(text="Volver a inventario",on_press=lambda *_:self.inventario()))
    def desconectar(self):
        self.req("/api/desconectar","POST",{})
        self.estado="Desconectado"; self.estado_lbl.text=self.estado
    def cargar_local(self):
        try:
            with open(LOCAL,"r",encoding="utf8") as f:self.progreso=float(json.load(f).get("progreso",0))
        except:pass

class App2M(App):
    def build(self): return Root()

if __name__=="__main__": App2M().run()
