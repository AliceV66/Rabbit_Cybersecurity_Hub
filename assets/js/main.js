// assets/js/main.js

// Ejecutar cuando el DOM esté listo
$(document).ready(function() {

    // --- Validación del Formulario de Contacto ---
    $('#contactForm').on('submit', function(event) {
        // Prevenir el envío real del formulario
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;
        const feedbackDiv = $('#form-feedback');
        feedbackDiv.removeClass('text-success text-danger').html('');

        // Validar campo de alias
        const alias = $('#alias');
        if (alias.val().trim() === '') {
            alias.addClass('is-invalid');
            isValid = false;
        } else {
            alias.removeClass('is-invalid').addClass('is-valid');
        }

        // Validar campo de email
        const email = $('#email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.val())) {
            email.addClass('is-invalid');
            isValid = false;
        } else {
            email.removeClass('is-invalid').addClass('is-valid');
        }

        // Validar campo de mensaje
        const message = $('#message');
        if (message.val().trim() === '') {
            message.addClass('is-invalid');
            isValid = false;
        } else {
            message.removeClass('is-invalid').addClass('is-valid');
        }

        // Mostrar feedback
        if (isValid) {
            feedbackDiv.addClass('text-success').html('// Transmisión exitosa. Canal seguro cerrado.');
            // Aquí se podría enviar el form con AJAX en un proyecto real
            this.reset();
            $('.form-control').removeClass('is-valid');
        } else {
            feedbackDiv.addClass('text-danger').html('// Error en la transmisión. Verifique los campos.');
        }
    });


    // --- Lógica del Test de Seguridad del Modal ---
    $('#securityTestForm').on('submit', function(event) {
        event.preventDefault();
        let score = 0;
        const totalQuestions = 2;
        
        // Sumar puntos de las respuestas correctas
        score += parseInt($('input[name="q1"]:checked').val() || 0);
        score += parseInt($('input[name="q2"]:checked').val() || 0);

        // Ocultar el formulario y mostrar los resultados
        $('#securityTestBody').hide();
        const resultDiv = $('#testResult');
        resultDiv.show();

        let feedbackHtml = '';
        if (score === totalQuestions) {
            feedbackHtml = `
                <h4 class="text-success section-title">// Nivel de Alerta: ALTO</h4>
                <p>Tu instinto de supervivencia digital está bien afinado. Reconoces las amenazas básicas y proteges tus activos. Sigue así.</p>
            `;
        } else if (score === 1) {
             feedbackHtml = `
                <h4 class="text-warning section-title">// Nivel de Alerta: MEDIO</h4>
                <p>Tienes nociones básicas, pero hay brechas en tu defensa. Un atacante persistente podría encontrarlas. Revisa los consejos de seguridad.</p>
            `;
        } else {
             feedbackHtml = `
                <h4 class="text-danger section-title">// Nivel de Alerta: BAJO</h4>
                <p>Eres un objetivo fácil. Tus prácticas de seguridad son vulnerables. Es crucial que aprendas a protegerte antes de que sea tarde.</p>
            `;
        }
        resultDiv.html(feedbackHtml);
    });

    // Resetear el modal cuando se cierra
    $('#securityTestModal').on('hidden.bs.modal', function () {
        $('#securityTestBody').show();
        $('#testResult').hide().html('');
        $('#securityTestForm')[0].reset();
    });

});