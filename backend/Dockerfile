FROM python:3.11-slim

WORKDIR /app

RUN python -m unidic download

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

EXPOSE 8000

CMD ["sh", "run.sh"]
