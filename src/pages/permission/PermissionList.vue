<template>
  <grant-form :business_data="business_data" >test</grant-form>
</template>

<script>
import GrantForm from '@/pages/permission/GrantForm'
export default {
  name: 'PermissionList',
  components: {
    GrantForm
  },
  data () {
    return {
      grantform: {
      }
    }
  }
}
</script>

<style scoped>

</style>
