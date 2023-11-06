function _wait() {
    let html = `
        <div class="loader"></div>
    `;
    Swal.fire({
        position: 'center',
        padding: '10em',
        html: html,
        background: 'rgba(253, 254, 254, 0.6)',
        backdrop: `
            rgba(253, 254, 254, 0.6)
            no-repeat
        `,
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    });
}

