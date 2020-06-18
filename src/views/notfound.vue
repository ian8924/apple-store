<template>
  <main
    id="main"
    class="main"
    role="main"
    data-page-type="overview"
  >
    <h1 class="section-headline typography-headline">
      你所尋找的頁面不存在
    </h1>
    <aside
      id="search-wrapper"
      role="search"
      data-analytics-region="search"
      aria-hidden="false"
    >
      <form
        id="searchform-form"
        class="searchform"
        action="/tw/search"
        method="get"
        data-suggestions-url="/search-services/suggestions/"
        @submit.prevent
      >
        <input
          id="searchform-input"
          type="text"
          class="form-textbox form-textbox-text form-icon-left"
          aria-labelledby="textbox_label"
          required=""
          aria-required="true"
          data-placeholder-long="Search for Products, Stores, and Help"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
        >
        <div
          id="searchform-submit"
          class="form-icons-wrapper form-icons-wrapper-left form-icons-focusable"
          type="submit"
          aria-label="Submit"
        >
          <button class="form-icons form-icons-search15" />
        </div>
        <div
          id="searchform-reset"
          class="button-reset form-icons-wrapper form-icons-focusable"
          type="reset"
          disabled=""
          aria-label="Clear Search"
        >
          <button
            class="form-icons form-icons-small form-icons-clearsolid15 form-icon-reset"
          />
        </div>
      </form>
    </aside>
  </main>
</template>

<script>
export default {
  name: 'PageNotFound',
  beforeRouteEnter (to, from, next) {
    // console.log("TCL: beforeRouteEnter -> to", to);
    // console.log("TCL: beforeRouteEnter -> from", from);
    next()
  }
}
</script>
