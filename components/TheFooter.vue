<script setup>
const theme = useState('theme');
const institutions = useState('institutions');
const w = theme.value.data.wording.de;
function getInstitution(abbreviation) {
  return institutions.value.data.find((i) => i.abbreviation === abbreviation);
}
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
            <a :href="getInstitution('FU').website" class="partner-logo university" target="_blank">
              <img class="logo-university"
                :src="`${projectConfig.imageBaseUrl}/${getInstitution('FU')?.logo}?key=feature-card`"
                :alt="`Logo ${getInstitution('FU')?.name_short}`" 
                decoding="async" loading="lazy" />
            </a>
            <a :href="getInstitution('HU').website" class="partner-logo university" target="_blank">
              <img class="logo-university"
                :src="`${projectConfig.imageBaseUrl}/${getInstitution('HU')?.logo}?key=feature-card`"
                :alt="`Logo ${getInstitution('HU')?.name_short}`" 
                decoding="async" loading="lazy" />
            </a>
            <a :href="getInstitution('TU').website" class="partner-logo university" target="_blank">
              <img class="logo-university"
                :src="`${projectConfig.imageBaseUrl}/${getInstitution('TU')?.logo}?key=feature-card`"
                :alt="`Logo ${getInstitution('TU')?.name_short}`" 
                 decoding="async" loading="lazy" />
            </a>
            <a :href="getInstitution('CH').website" class="partner-logo university" target="_blank">
              <img class="logo-university"
                :src="`${projectConfig.imageBaseUrl}/${getInstitution('CH')?.logo}?key=feature-card`"
                :alt="`Logo ${getInstitution('CH')?.name_short}`" 
                decoding="async" loading="lazy" />
            </a>
          </div>
        </div>
        <div class="order-1 col-sm-6">
          <p class="small text-center text-sm-end">
            <NuxtLink to="/impressum">Impressum</NuxtLink> | <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
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
            flex-wrap: wrap;
            justify-content: center;
            .university {
              .logo-university {
                width: 100%;
              }
            }


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
              &.university {
                
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
