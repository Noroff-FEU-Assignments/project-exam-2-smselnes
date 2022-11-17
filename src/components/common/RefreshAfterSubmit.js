export default function refreshAfterSubmit() {
  setTimeout(() => {
    window.location.reload(true);
  }, 1000);
}
