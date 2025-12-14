from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates('templates')
app.mount('/dist', StaticFiles(directory='dist'), 'dist')

@app.get('/')
def get_root(request: Request):
    context = {
            'request': request
        }
    return templates.TemplateResponse('base.html', context)

@app.post('/api/multiselect-submit')
async def post_multiselect_submit(request: Request):
    print(await request.json())
    return {'sucess': True}

