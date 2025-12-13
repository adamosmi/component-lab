from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates('templates')
app.mount('/dist', StaticFiles(directory='dist'), 'dist')

@app.get('/')
async def get_root(request: Request):
    context = {
            'request': request
        }
    return templates.TemplateResponse('base.html', context)
