# ─────────────────────────────────────────────────────────────────
# Backend
# ─────────────────────────────────────────────────────────────────
FROM python:3.11-slim
WORKDIR /usr/local/src/app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chmod +x ./entrypoint.sh
EXPOSE 8000
HEALTHCHECK --interval=60s --start-interval=5s --start-period=10s \
    --timeout=10s --retries=3 \
    CMD python -c "import sys, urllib.request; \
    sys.exit( \
    0 if urllib.request.urlopen('http://localhost:8000/api/').getcode() == 200 else 1)"
ENTRYPOINT ["./entrypoint.sh"]
