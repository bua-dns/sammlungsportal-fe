<script setup>
const theme = useState('theme');
const w = theme.value.data.wording.de;
</script>
<template>
  <footer class="pt-4">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 pb-4 pb-lg-0">
          <div class="row">
            <div class="col text-center text-lg-start">
              <figure class="site-footer__logo">
                <img src="@/assets/img/logo/logo-bua.jpg" alt="Berlin University Alliance Logo" />
              </figure>
              <p v-html="convertLineBreaks(w.project_funding)" class="small-xs"></p>
            </div>
          </div>
          <div class="row">
            <div class="col text-center text-lg-start">
              <h4 v-html="w.contact" class="mt-4 small-xs"></h4>
              <p v-html="convertLineBreaks(w.project_contact)" class="small-xs"></p>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="row">
            <div
              class="col d-md-flex flex-row flex-wrap align-items-start justify-content-center justify-content-lg-end gap-0 gap-md-4 pb-5 pb-md-4">
              <figure class="site-footer__partnerlogo">
                <img class="logo-bmbf" src="@/assets/img/logo/logo-bmbf.svg"
                  alt="Bundesministerium für Bildung und Forschung Logo" decoding="async" loading="lazy" />
              </figure>
              <figure class="site-footer__partnerlogo pt-4 pt-md-2">
                <img class="logo-sen-kanz-wif" src="@/assets/img/logo/B_SEN_WGPG_Logo_DE_V_PT_RGB.png"
                  alt="Der Regierende Bürgermeister von Berlin, Senatskanzlei, Wissenschaft und Forschung Logo"
                  decoding="async" loading="lazy" />
              </figure>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div
                class="logos-universities d-md-flex flex-row flex-wrap align-items-end justify-content-center justify-content-lg-end gap-0 gap-md-4 pt-3 ">
                <figure class="site-footer__partnerlogo">
                  <img class="logo-university" src="@/assets/img/logo/FU-neu.svg" alt="Freie Universität Berlin Logo"
                    decoding="async" loading="lazy" />
                </figure>
                <figure class="site-footer__partnerlogo">
                  <img class="logo-university" src="@/assets/img/logo/logo-hu.webp"
                    alt="Humboldt Universität zu Berlin Logo" decoding="async" loading="lazy" />
                </figure>
                <figure class="site-footer__partnerlogo">
                  <img class="logo-university" src="@/assets/img/logo/logo-tu.jpg"
                    alt="Technische Universität Berlin Logo" decoding="async" loading="lazy" />
                </figure>
                <figure class="site-footer__partnerlogo">
                  <img class="logo-university" src="@/assets/img/logo/logo-charite.webp" alt="Charité Logo"
                    decoding="async" loading="lazy" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="order-0 col-sm-6">
          <p class="small text-center text-sm-start">{{ w.site_copy_rights }}</p>
        </div>
        <div class="order-1 col-sm-6">
          <p class="small text-center text-sm-end">
            <NuxtLink to="/impressum">Impressum</NuxtLink> | <NuxtLink
              to="https://www.berlin-university-alliance.de/privacy-policy/index.html">Datenschutz</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  // background-color: rgba(245, 245, 245, 0.66);
  // background-color: #f3f3f3;
  background-color: var(--color-footer-background);

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

.site-footer__partnerlogo {
  img {
    max-width: 100%;
    object-fit: cover;
    mix-blend-mode: multiply;
  }
}

.site-footer__logo {
  img {
    width: 100%;
    max-width: 400px;
    object-fit: cover;
    mix-blend-mode: multiply;
  }
}

.logo-bmbf {
  height: 80px;
}

.logo-university {
  height: 100px;
}

.logo-sen-kanz-wif {
  height: 80px;
}

@media (min-width: 768px) {
  .logo-university {
    height: 80px;
  }

  .logo-bmbf {
    height: 64px;
  }

  .logo-sen-kanz-wif {
    height: 64px;
  }
}

@media (min-width: 1100px) {
  .logo-university {
    height: 100px;
  }

  .logo-bmbf {
    height: 80px;
  }

  .logo-sen-kanz-wif {
    height: 80px;
  }
}


.logos-universities {
  border-top: 1px solid #ccc;
}

.site-footer p {
  font-weight: 300;
}

figure {
  display: block;
  text-align: center;
  margin: 0;

  // @media (min-width: 576px) {
  //   display: inline-block;
  //   margin: 0;
  // }
}
</style>
