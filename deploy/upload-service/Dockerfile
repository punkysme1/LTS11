FROM node:22-alpine
ENV NODE_ENV=production PORT=8183 IMAGE_DIRECTORY=/opt/turots-iiif/images
RUN apk add --no-cache poppler-utils
WORKDIR /app
COPY server.mjs /app/server.mjs
USER 1000:1000
EXPOSE 8183
CMD ["node", "/app/server.mjs"]
