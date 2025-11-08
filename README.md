# Sistema Inteligente de Validación y Análisis Preventivo para Onboarding

Este repositorio contiene el código fuente para la Prueba de Concepto (PoC) de un Sistema Inteligente de Validación y Análisis Preventivo para Onboarding para el Banco Andino, como parte del "Proyecto Hito 1 - Hagamos una iniciativa de Gen AI".

## Descripción del Proyecto

Este es un sistema diseñado para optimizar el proceso de onboarding de nuevos clientes bancarios. Utiliza un enfoque de **validación preventiva** mediante tres agentes de IA especializados para analizar las solicitudes en tiempo real, proporcionando una respuesta en aproximadamente 5 segundos.

### Agentes de IA
1.  **Agente de Completitud**: Verifica que todos los campos y documentos requeridos estén presentes.
2.  **Agente de Coherencia**: Usa OCR y un Large Language Model (LLM) para comparar los datos del formulario con los documentos adjuntos.
3.  **Agente de Riesgo**: Realiza una evaluación preliminar para detectar Personas Expuestas Políticamente (PEP) y otras actividades de riesgo.

## Stack Tecnológico

-   **Frontend**: React 18+, TypeScript, React Hook Form, Yup, TailwindCSS.
-   **Backend**: Node.js 18+, Express.
-   **Infraestructura (Planificada)**: AWS (API Gateway, Lambda/EC2, DynamoDB, S3, Cognito).
-   **LLMs (Planificados)**: OpenAI GPT-4 y Anthropic Claude 3.

## Estructura del Repositorio

```
├── backend/         # Código del servidor Node.js (Express)
├── frontend/        # Aplicación cliente (React)
├── .gitignore       # Archivos y carpetas ignorados por Git
├── PARTE_II...md    # Documento de especificación de requerimientos
├── RESUMEN_...md    # Resumen de implementación
└── README.md        # Este archivo
```

## Cómo Ejecutar el Frontend

Actualmente, solo el componente de formulario del frontend está implementado (TASK-001).

1.  **Navegar a la carpeta del frontend:**
    ```bash
    cd frontend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm start
    ```

La aplicación estará disponible en `http://localhost:3000`.

## Próximos Pasos

-   **TASK-002**: Implementar el componente de carga de documentos.
-   **TASK-003**: Desarrollar el endpoint `POST /api/validar-solicitud` en el backend.
-   Integrar el frontend con el backend para el envío de solicitudes.
