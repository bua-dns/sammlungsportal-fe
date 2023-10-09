<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p>© 2023 - BUA All rights reserved</p>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-lg-4">
          <div class="row">
            <div class="col text-center text-md-start">
              <figure class="site-footer__logo ps-9 ps-md-0 pe-9 pe-md-3 pe-lg-7">
                <img
                  src="https://ssc.hu-berlin.de/wp-content/themes/huss/assets/images/logo-bua@3x.jpg"
                  alt="Berlin University Alliance Logo"
                />
              </figure>
              <p class="fs-8">
                Gefördert vom Bundesministerium für Bildung <br />
                und Forschung (BMBF) und dem Land Berlin im Rahmen <br />
                der Exzellenzstrategie von Bund und Ländern
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col text-center text-md-start">
              <p class="fw-semibold mt-4 fs-8 fs-md-6">KONTAKT<br /></p>
              <p class="fs-8">
                Postanschrift:<br />
                Geschäftsstelle Berlin University Alliance <br />
                Kleine Präsidentenstraße 1<br />
                10178 Berlin
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-8 mt-7 mt-lg-0">
          <div class="row h-0 h-auto h-lg-50 mb-md-4 mb-lg-0">
            <div
              class="col text-center text-md-end d-flex flex-row flex-wrap align-items-start justify-content-center justify-content-md-start justify-content-lg-end gap-0 gap-md-5 gap-lg-6 pb-5 pb-md-0"
            >
              <figure class="site-footer__partnerlogo w-100 w-md-auto">
                <img
                  width="260"
                  height="200"
                  src="https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-bmbf@2x.webp"
                  class="attachment-full size-full"
                  alt="Bundesministerium für Bildung und Forschung Logo"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
              <figure class="site-footer__partnerlogo w-100 w-md-auto">
                <img
                  width="644"
                  height="200"
                  src="https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-sen-kanz-wif@2x.webp"
                  class="attachment-full size-full"
                  alt=""
                  decoding="async"
                  loading="lazy"
                  srcset="
                    https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-sen-kanz-wif@2x.webp        644w,
                    https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-sen-kanz-wif@2x-300x93.webp 300w
                  "
                  sizes="(max-width: 644px) 100vw, 644px"
                />
              </figure>
            </div>
          </div>
          <div class="row h-auto h-lg-50 justify-content-md-end">
            <div class="col text-center text-md-end h-100">
              <div
                class="pt-5 pt-md-0 d-flex flex-row flex-wrap align-items-end justify-content-center justify-content-md-start justify-content-lg-end gap-0 gap-md-5 gap-lg-6 h-100 border-top border-1 border-secondary"
              >
                <figure class="site-footer__partnerlogo w-100 w-md-auto">
                  <img
                    width="452"
                    height="200"
                    src="https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-fu@2x.webp"
                    class="attachment-full size-full"
                    alt=""
                    decoding="async"
                    loading="lazy"
                    srcset="
                      https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-fu@2x.webp         452w,
                      https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-fu@2x-300x133.webp 300w
                    "
                    sizes="(max-width: 452px) 100vw, 452px"
                  />
                </figure>
                <figure class="site-footer__partnerlogo w-100 w-md-auto">
                  <img
                    width="312"
                    height="200"
                    src="https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-hu@2x.webp"
                    class="attachment-full size-full"
                    alt=""
                    decoding="async"
                    loading="lazy"
                    srcset="
                      https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-hu@2x.webp         312w,
                      https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-hu@2x-300x192.webp 300w
                    "
                    sizes="(max-width: 312px) 100vw, 312px"
                  />
                </figure>
                <figure class="site-footer__partnerlogo w-100 w-md-auto">
                  <img
                    width="196"
                    height="200"
                    src="https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-tu@2x.webp"
                    class="attachment-full size-full"
                    alt="Technische Universität Berlin Logo"
                    decoding="async"
                    loading="lazy"
                  />
                </figure>
                <figure class="site-footer__partnerlogo w-100 w-md-auto">
                  <img
                    width="300"
                    height="200"
                    src="https://ssc.hu-berlin.de/wp-content/uploads/2023/01/logo-charite@2x.webp"
                    class="attachment-full size-full"
                    alt=""
                    decoding="async"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.site-footer__logo {
  width: 100%;
}
.site-footer__logo img {
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
  mix-blend-mode: multiply;
}

@media (min-width: 768px) {
  .site-footer__logo img {
    width: 60%;
  }
}

@media (min-width: 992px) {
  .site-footer__logo img {
    width: 100%;
  }
}

.site-footer p {
  font-weight: 300;
}
</style>
