FROM node:14-alpine3.16 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM node:14-alpine3.16

ENV NODE_ENV production
ENV POSTGRES_URL postgres://deihjtelbbuywj:873ff9aefc7f925c03eb2663ef96efbaad81972e8127f59fa409485ebae6f900@ec2-3-222-74-92.compute-1.amazonaws.com:5432/daosdk9lg30d60
ENV PGSSLMODE no-verify

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/src/main.js"]