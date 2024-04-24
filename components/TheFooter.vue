<script setup>
const theme = useState('theme');
const w = theme.value.data.wording.de;
</script>
<template>
  <footer class="pt-4">
    <div class="container-fluid mb-5">
      <div class="footer-grid">
        <div class="footer-grid-row top mb-2">
          <div class="footer-content-box info-box bua">
            <figure class="bua-logo">
              <img src="@/assets/img/logo/logo-bua.jpg" alt="Berlin University Alliance Logo" />
            </figure>
            <div v-html="convertLineBreaks(w.project_funding) " class="small-xs"></div>
          </div>
          <div class="footer-content-box logo-box bund-berlin">
            <figure class="partner-logo bund-berlin">
              <img class="logo-bmbf" src="@/assets/img/logo/logo-bmbf.svg"
                alt="Bundesministerium für Bildung und Forschung Logo" decoding="async" loading="lazy" />
            </figure>
            <figure class="partner-logo bund-berlin">
              <img class="logo-sen-kanz-wif" src="@/assets/img/logo/B_SEN_WGP_Logo.png"
                alt="Der Regierende Bürgermeister von Berlin, Senatskanzlei, Wissenschaft und Forschung Logo"
                decoding="async" loading="lazy" />
            </figure>
          </div>
        </div>
        <div class="footer-grid-row bottom">
          <div class="footer-content-box contact">
            <div class="contact-info">
              <h4 v-html="w.contact" class="mt-4 small-xs"></h4>
              <p v-html="convertLineBreaks(w.project_contact) " class="small-xs"></p>
            </div>
          </div>
          <div class="footer-content-box logo-box universities">
            <figure class="partner-logo universities">
              <img class="logo-university" src="@/assets/img/logo/FU-neu.svg" alt="Freie Universität Berlin Logo"
                decoding="async" loading="lazy" />
            </figure>
            <figure class="partner-logo universities">
              <img class="logo-university" src="@/assets/img/logo/logo-hu.webp"
                alt="Humboldt Universität zu Berlin Logo" decoding="async" loading="lazy" />
            </figure>
            <figure class="partner-logo universities">
              <img class="logo-university" src="@/assets/img/logo/logo-tu.jpg" alt="Technische Universität Berlin Logo"
                decoding="async" loading="lazy" />
            </figure>
            <figure class="partner-logo universities">
              <img class="logo-university" src="@/assets/img/logo/logo-charite.webp" alt="Charité Logo" decoding="async"
                loading="lazy" />
            </figure>
          </div>
        </div>
        <div class="order-1 col-sm-6">
          <p class="small text-center text-sm-end">
            <NuxtLink to="/impressum">Impressum</NuxtLink> | <NuxtLink
              to="/datenschutz">Datenschutz</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>




footer {
  background-color: var(--color-footer-background);
  border: 1px solid var(--color-footer-background);
  .footer-grid {
      .footer-grid-row {
        &.top {
          @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1rem;
          }
        }
        &.bottom {

          @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1rem;
          }
        }
        .footer-content-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          text-align: center;
          img {
            display: block;
            max-width: 100%;
            height: auto;
            mix-blend-mode: multiply;
          }

          @media screen and (min-width: 768px) {
            text-align: left;
          }
          &.info-box {
            .bua-logo {
              margin: 0 auto;
              @media screen and (min-width: 360px) {
                max-width: 20rem;
              }

              @media screen and (min-width: 768px) {
                margin: 0;
              }
              img {
                max-width: 100%;

              }
            }
          }
          &.logo-box {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            justify-content: center;


            @media screen and (min-width: 768px) {
                justify-content: flex-end;
              }
            .partner-logo {
              display: flex;
              align-items: center;
              flex: 0 1 6rem;
              margin: 0;
              &.bund-berlin {

                @media screen and (min-width: 768px) {
                  flex: 0 1 8rem;
                }

                @media screen and (min-width: 800px) {
                  flex: 0 1 10rem;
                }
              }
              &.universities {
                
                @media screen and (min-width: 768px) {
                  flex: 0 1 14rem;
                }

                @media screen and (min-width: 1000px) {
                  flex: 0 1 9rem;
                }
              }
            }
        }
      }
    }
  }
  a {
    color: var(--color-text);
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      color: var(--color-text);
      text-decoration: underline;
    }
  }
}

.footer p {
  font-weight: 300;
}

</style>
