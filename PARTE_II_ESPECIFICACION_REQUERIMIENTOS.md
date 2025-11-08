# Parte II – Especificación de Requerimientos
## Sistema de Validación Preventiva para Onboarding Bancario
### Banco Andino - PoC

---

## Tabla de Contenidos

1. [Actividad 2: Investigación](#actividad-2-investigación)
   - 1.1 [Funcionalidades Básicas del Sistema](#11-funcionalidades-básicas-del-sistema)
   - 1.2 [Beneficios al Cliente](#12-beneficios-al-cliente)
   - 1.3 [Customer Journey](#13-customer-journey-interacciones-paso-a-paso)
2. [Actividad 2: Planeación - Casos de Uso](#actividad-2-planeación---casos-de-uso)
   - 2.1 [Casos de Uso para MVP](#21-casos-de-uso-para-mvp)
   - 2.2 [Diagrama de Casos de Uso (PlantUML)](#22-diagrama-de-casos-de-uso-plantuml)
3. [Actividad 2: Planeación - Modelo de Datos](#actividad-2-planeación---modelo-de-datos)
   - 3.1 [Entidades Principales](#31-entidades-principales)
   - 3.2 [Diagrama de Entidades (Mermaid)](#32-diagrama-de-entidades-mermaid)
   - 3.3 [Estructura de Datos en DynamoDB](#33-estructura-de-datos-en-dynamodb)
4. [Actividad 2: Arquitectura AWS](#actividad-2-arquitectura-aws)
   - 4.1 [Componentes de la Arquitectura](#41-componentes-de-la-arquitectura)
   - 4.2 [Diagrama de Arquitectura](#42-diagrama-de-arquitectura)

---

# Actividad 2: Investigación

## 1.1 Funcionalidades Básicas del Sistema

### Prompt Utilizado

```
Eres un experto en producto, con experiencia en Sistemas de Validación Preventiva para Onboarding Bancario.

¿Qué funcionalidades básicas tiene un Sistema de Validación Preventiva para Onboarding Bancario?

Descríbelas en un listado, ordenado de mayor a menor prioridad.
```

### Funcionalidades Identificadas (Priorizadas)

#### **CRÍTICA - Funcionalidades Esenciales para MVP**

1. **Validación de Completitud de Formulario**
   - Verificar que todos los campos obligatorios estén llenos
   - Validar que documentos requeridos (RUT, cédula, extractos bancarios) estén adjuntos
   - Validar formatos de archivo permitidos (PDF, JPG, PNG)
   - Tiempo de respuesta: < 1 segundo

2. **Análisis de Coherencia con LLM (Agente Principal)**
   - Extraer información de documentos mediante OCR
   - Comparar datos del formulario vs datos extraídos de documentos
   - Detectar incoherencias (ej: ingresos declarados vs ingresos en extractos)
   - Utilizar LLM (GPT-4 o Claude) para análisis semántico
   - Tiempo de respuesta: 3-4 segundos

3. **Evaluación de Riesgo Preliminar**
   - Detectar PEP (Personas Expuestas Políticamente)
   - Identificar actividades económicas de alto riesgo
   - Calcular nivel de riesgo: Bajo, Medio, Alto, Muy Alto
   - Tiempo de respuesta: < 1 segundo

4. **Motor de Decisión Consolidado**
   - Integrar resultados de los 3 agentes (Completitud, Coherencia, Riesgo)
   - Generar decisión única: "ContinuarFlujoTradicional" o "SolicitarInformacionAdicional"
   - Crear lista de hallazgos específicos si hay errores
   - Tiempo total: ~5 segundos

5. **Interfaz de Carga de Documentos**
   - Formulario web responsive (React)
   - Carga drag-and-drop de documentos
   - Previsualización de archivos adjuntos
   - Indicador de progreso durante validación (5 segundos)

6. **Notificación de Resultados en Tiempo Real**
   - Mostrar resultado inmediato después de 5 segundos
   - Listar hallazgos específicos si hay errores
   - Indicar próximos pasos (corrección o aprobación)

#### **ALTA - Funcionalidades Importantes**

7. **Re-envío y Corrección de Solicitud**
   - Permitir al cliente corregir información detectada como errónea
   - Adjuntar documentos adicionales si es necesario
   - Re-validar automáticamente al reenviar
   - Mantener historial de intentos

8. **Backoffice para Analistas Bancarios**
   - Dashboard con todas las solicitudes procesadas
   - Filtros por estado: "Validación Exitosa", "Requiere Corrección", "Rechazada"
   - Visualización de hallazgos detectados por el sistema
   - Autenticación con AWS Cognito

#### **MEDIA - Funcionalidades Deseables**

9. **Consulta de Estado de Solicitud**
   - Cliente puede consultar estado con código de seguimiento
   - Mostrar progreso: "En Validación", "Pendiente Corrección", "Aprobada"

10. **Caché de Resultados de Validación**
    - Almacenar resultados en ElastiCache Redis (TTL 1 hora)
    - Evitar re-procesamiento de solicitudes duplicadas
    - Mejorar tiempo de respuesta de 5s a <1s para re-consultas

#### **BAJA - Funcionalidades Futuras**

11. **Notificaciones por Email/SMS**
    - Enviar email al cliente cuando cambie el estado de su solicitud
    - Notificar a analistas cuando lleguen solicitudes de alto riesgo

#### **NICE-TO-HAVE - Funcionalidades Opcionales**

12. **Métricas y Reportes**
    - Dashboard de métricas: tasa de aprobación automática, tiempo promedio de validación
    - Top 10 hallazgos más frecuentes
    - Reportes semanales para compliance

---

## 1.2 Beneficios al Cliente

### Prompt Utilizado

```
Eres un experto en experiencia de usuario y transformación digital bancaria.

¿Cuáles son los beneficios tangibles e intangibles que obtiene un cliente al usar un Sistema de Validación Preventiva para Onboarding Bancario (vs el proceso tradicional)?

Dame beneficios específicos, medibles y priorizados.
```

### Beneficios Identificados

#### **Categoría 1: Ahorro de Tiempo**

1. **Validación inmediata en 5 segundos (vs 5-7 días tradicionales)**
   - Cliente sabe al instante si su solicitud tiene errores
   - No necesita esperar días para recibir feedback
   - **Métrica:** Reducción de 5-7 días a 5 segundos = 99.99% más rápido

2. **Corrección en tiempo real (vs múltiples visitas a sucursal)**
   - Cliente puede corregir errores inmediatamente desde su casa
   - No necesita agendar cita ni desplazarse
   - **Métrica:** 0 visitas a sucursal vs 2-3 visitas tradicionales

3. **Proceso completo en 1 sesión (vs varias semanas)**
   - Cliente puede completar todo el onboarding en 10-15 minutos
   - **Métrica:** 85-90% de solicitudes aprobadas en primer intento

#### **Categoría 2: Mejor Experiencia**

4. **Feedback específico y accionable**
   - Sistema indica exactamente qué está mal: "Los ingresos declarados (15M) difieren de los extractos (8.5M)"
   - No es un simple "Solicitud rechazada"
   - **Métrica:** Claridad del mensaje: 95% de clientes entienden qué deben corregir

5. **Disponibilidad 24/7**
   - Cliente puede enviar solicitud en cualquier momento
   - No depende de horarios de oficina (9am-5pm)
   - **Métrica:** 40% de solicitudes enviadas fuera de horario laboral

6. **Proceso 100% digital**
   - No requiere imprimir, escanear ni llevar documentos físicos
   - Todo desde smartphone o computador
   - **Métrica:** 0 papeles físicos requeridos

#### **Categoría 3: Transparencia y Confianza**

7. **Trazabilidad completa**
   - Cliente puede consultar estado de su solicitud con código de seguimiento
   - Recibe notificaciones cuando cambia el estado
   - **Métrica:** 100% de solicitudes rastreables

8. **Criterios de validación claros**
   - Cliente sabe qué se está validando (completitud, coherencia, riesgo)
   - Entiende por qué se solicita información adicional
   - **Métrica:** Reducción de 60% en llamadas a servicio al cliente preguntando "¿por qué fue rechazada mi solicitud?"

#### **Categoría 4: Reducción de Fricción**

9. **Menos iteraciones de corrección**
   - Sistema detecta TODOS los errores en primer análisis (no solo el primero)
   - Cliente no recibe múltiples solicitudes de corrección
   - **Métrica:** 1 iteración de corrección vs 3-4 iteraciones tradicionales

10. **Pre-aprobación confiable**
    - Si sistema dice "Validación exitosa", cliente tiene 95% de probabilidad de ser aprobado por comité
    - Reduce ansiedad e incertidumbre
    - **Métrica:** Tasa de aprobación post-validación: 95%

11. **Reducción de documentos solicitados**
    - Sistema solo solicita documentos adicionales si realmente hay inconsistencias
    - No pide "todo por si acaso"
    - **Métrica:** 30% menos documentos solicitados vs proceso tradicional

12. **Comunicación asíncrona**
    - Cliente no necesita quedarse al teléfono esperando
    - Recibe notificación cuando hay novedades
    - **Métrica:** 0 minutos en espera telefónica

### Resumen Cuantitativo de Beneficios

| **Métrica** | **Proceso Tradicional** | **Con Validación Preventiva** | **Mejora** |
|-------------|-------------------------|-------------------------------|------------|
| Tiempo de feedback inicial | 5-7 días | 5 segundos | 99.99% más rápido |
| Visitas a sucursal | 2-3 visitas | 0 visitas | 100% reducción |
| Iteraciones de corrección | 3-4 ciclos | 1 ciclo | 70% reducción |
| Documentos solicitados | 100% de casos | 70% de casos | 30% reducción |
| Disponibilidad | Lunes-Viernes 9am-5pm | 24/7/365 | 3x más horas |
| Tiempo total de onboarding | 2-4 semanas | 2-3 días | 85-90% reducción |

---

## 1.3 Customer Journey: Interacciones Paso a Paso

### Prompt Utilizado

```
Eres un experto en diseño de experiencia de usuario para servicios bancarios digitales.

¿Cómo es el customer journey normal de un cliente que usa un Sistema de Validación Preventiva para Onboarding Bancario?

Descríbeme paso a paso todas las interacciones entre el cliente y el sistema.

Contexto del sistema:
- Cliente llena formulario web de vinculación
- Adjunta documentos (RUT, cédula, extractos bancarios)
- Sistema valida inmediatamente (5 segundos) con 3 agentes de IA
- Si hay errores/faltantes, cliente recibe feedback específico
- Cliente puede corregir y re-enviar de inmediato
```

### Paso a Paso de las Interacciones

#### **ETAPA 1: Inicio del Proceso**

**Interacción 1:** Cliente accede al sitio web del Banco Andino
- Cliente hace clic en botón "Abrir cuenta" o "Vincularse"

**Interacción 2:** Sistema muestra página de bienvenida
- Sistema presenta: "Validación inmediata en 5 segundos"
- Sistema lista requisitos: RUT, cédula, extractos bancarios

**Interacción 3:** Cliente hace clic en "Comenzar solicitud"
- Sistema muestra formulario web de vinculación

#### **ETAPA 2: Llenado de Formulario**

**Interacción 4:** Cliente completa campos del formulario
- Cliente ingresa: nombre completo, tipo de identificación, número de identificación
- Cliente ingresa: actividad económica, ingresos mensuales
- Cliente selecciona: ¿Es PEP? (Sí/No), ¿Maneja moneda extranjera? (Sí/No)

**Interacción 5:** Cliente adjunta documentos
- Cliente hace clic en "Cargar RUT" → selecciona archivo PDF → Sistema confirma "✓ RUT cargado"
- Cliente hace clic en "Cargar cédula" → selecciona archivo → Sistema confirma "✓ Cédula cargada"
- Cliente hace clic en "Cargar extractos bancarios" → selecciona archivos → Sistema confirma "✓ Extractos cargados"

**Interacción 6:** Cliente revisa información ingresada
- Cliente verifica datos antes de enviar

**Interacción 7:** Cliente hace clic en botón "Validar y Enviar"
- Sistema muestra indicador de progreso: "Validando... Por favor espere 5 segundos"

#### **ETAPA 3: Validación Automática (5 segundos)**

**Interacción 8:** Sistema procesa formulario con 3 agentes de IA
- Sistema ejecuta validaciones en segundo plano (cliente ve barra de progreso)

**Interacción 9:** Sistema muestra resultado de validación

**ESCENARIO A: Todo está correcto**
- Sistema muestra pantalla: "✅ Validación exitosa"
- Sistema presenta resumen: "Completitud: 100%, Coherencia: Alta, Riesgo: Bajo"
- Sistema indica próximo paso: "Un analista revisará su solicitud en 24-48 horas"
- Cliente hace clic en "Finalizar"
- **FIN DEL JOURNEY**

**ESCENARIO B: Faltan campos o documentos**
- Sistema muestra pantalla: "⚠️ Información incompleta"
- Sistema presenta lista específica: "❌ Falta: Ingresos mensuales", "❌ Falta: Extractos bancarios"
- Sistema muestra botón: "Completar información"
- **Continúa en ETAPA 4**

**ESCENARIO C: Hay incoherencias**
- Sistema muestra pantalla: "⚠️ Inconsistencias detectadas"
- Sistema presenta hallazgos: "Los ingresos declarados (15M COP) difieren de los ingresos en extractos (8M COP)"
- Sistema muestra opciones: "Corregir formulario" o "Aportar documentación adicional"
- **Continúa en ETAPA 4**

#### **ETAPA 4: Corrección y Re-envío (solo si hubo errores)**

**Interacción 10:** Cliente completa/corrige información faltante
- Cliente completa campos faltantes
- Cliente adjunta documentos adicionales
- Cliente hace clic en "Re-validar"

**Interacción 11:** Sistema vuelve a validar (5 segundos)
- Sistema muestra: "Re-validando..."

**Interacción 12:** Sistema muestra nuevo resultado
- **Si ahora todo está OK:** Sistema muestra "✅ Validación exitosa" → **FIN**
- **Si aún falta algo:** Sistema muestra lista actualizada → **Vuelve a Interacción 10**

#### **Resumen de Interacciones por Flujo**

**Flujo Ideal (sin errores):**
1. Accede a sitio web
2. Hace clic en "Abrir cuenta"
3. Completa formulario
4. Adjunta documentos
5. Hace clic en "Validar y Enviar"
6. Espera 5 segundos
7. Ve resultado: "✅ Validación exitosa"
8. Hace clic en "Finalizar"

**Total: 8 interacciones en 10-15 minutos**

**Flujo con Correcciones (1 iteración):**
1-7. (Igual que flujo ideal)
8. Ve resultado: "⚠️ Información incompleta"
9. Lee lista de faltantes
10. Completa información faltante
11. Hace clic en "Re-validar"
12. Espera 5 segundos
13. Ve resultado: "✅ Validación exitosa"
14. Hace clic en "Finalizar"

**Total: 14 interacciones en 15-20 minutos**

---

# Actividad 2: Planeación - Casos de Uso

## 2.1 Casos de Uso para MVP

### Prompt Utilizado

```
Eres un analista de software experto. Estoy construyendo un MVP de un Sistema de Validación Preventiva para Onboarding Bancario que solamente haga validación automática inmediata (en ~5 segundos) de formularios vs documentos adjuntos antes de que lleguen al comité de aprobación.

Enumera y describe brevemente los casos de uso más importantes a implementar para lograr una funcionalidad básica.
```

### Casos de Uso Identificados

#### **CU-01: Enviar Solicitud de Vinculación**
**Actor:** Cliente (no autenticado)
**Descripción:** El cliente completa el formulario de vinculación bancaria y adjunta los documentos requeridos (RUT, cédula, estados bancarios). El sistema recibe y almacena temporalmente la información para procesamiento.
**Prioridad:** CRÍTICA

#### **CU-02: Validar Completitud de Formulario**
**Actor:** Sistema (Agente 1 - Validador de Completitud)
**Descripción:** El sistema verifica automáticamente que todos los campos obligatorios del formulario estén completos y que los documentos requeridos estén adjuntos en formatos válidos (PDF, JPG, PNG).
**Prioridad:** CRÍTICA

#### **CU-03: Extraer Información de Documentos (OCR)**
**Actor:** Sistema (Agente 2 - Analizador de Coherencia)
**Descripción:** El sistema utiliza OCR para extraer texto e información estructurada de los documentos adjuntos (nombre, número de identificación, ingresos, dirección, etc.).
**Prioridad:** CRÍTICA

#### **CU-04: Comparar Coherencia Formulario vs Documentos**
**Actor:** Sistema (Agente 2 - Analizador de Coherencia con LLM)
**Descripción:** El sistema utiliza un LLM (GPT-4 o Claude) para comparar la información del formulario contra los datos extraídos de los documentos y detectar incoherencias (ej: nombre diferente, ingresos que no coinciden, direcciones distintas).
**Prioridad:** CRÍTICA

#### **CU-05: Evaluar Riesgo Preliminar**
**Actor:** Sistema (Agente 3 - Evaluador de Riesgo)
**Descripción:** El sistema analiza si el cliente presenta características de alto riesgo como: PEP (Persona Expuesta Políticamente), actividades económicas de alto riesgo, países sancionados, o montos inusuales.
**Prioridad:** ALTA

#### **CU-06: Consolidar Resultados de Validación**
**Actor:** Sistema (Motor de Decisión)
**Descripción:** El sistema consolida los resultados de los 3 agentes y genera una decisión única: "ContinuarFlujoTradicional" (si todo está correcto) o "SolicitarInformacionAdicional" (si hay problemas).
**Prioridad:** CRÍTICA

#### **CU-07: Notificar Resultado al Cliente**
**Actor:** Sistema
**Descripción:** El sistema muestra al cliente el resultado de la validación en pantalla. Si es exitoso, indica que su solicitud fue enviada al comité. Si hay problemas, lista los hallazgos específicos (campos faltantes, incoherencias detectadas).
**Prioridad:** CRÍTICA

#### **CU-08: Corregir y Reenviar Solicitud**
**Actor:** Cliente (no autenticado)
**Descripción:** Si la validación detectó problemas, el cliente puede corregir la información del formulario, reemplazar documentos o adjuntar documentos adicionales, y reenviar la solicitud para nueva validación.
**Prioridad:** ALTA

#### **CU-09: Consultar Estado de Solicitud**
**Actor:** Cliente (no autenticado, con código de seguimiento)
**Descripción:** El cliente puede consultar el estado actual de su solicitud ingresando un código único generado al momento del envío inicial.
**Prioridad:** MEDIA

#### **CU-10: Visualizar Historial de Validaciones (Backoffice)**
**Actor:** Analista Bancario (autenticado)
**Descripción:** El analista puede acceder a un panel donde visualiza todas las solicitudes procesadas, filtrar por estado (aprobadas automáticamente, pendientes de información, en comité), y revisar los hallazgos detectados por el sistema.
**Prioridad:** MEDIA

---

## 2.2 Diagrama de Casos de Uso (PlantUML)

### Prompt Utilizado

```
Representa estos casos de uso en el tipo de diagrama más adecuado usando el formato plantUML.

Diferencia entre usuarios visitantes y usuarios logueados.

Acorde a la sintaxis y buenas prácticas UML, define y describe lo que sea necesario.
```

### Diagrama PlantUML

```plantuml
@startuml
!define RECTANGLE class

' Definición de actores
actor "Cliente\n(Visitante)" as Cliente #LightBlue
actor "Analista Bancario\n(Autenticado)" as Analista #LightGreen
actor "Sistema\n(Agentes IA)" as Sistema #LightGray

' Definición del sistema
rectangle "Sistema de Validación Preventiva\npara Onboarding Bancario" {

  ' Casos de uso para Cliente (Visitante)
  usecase "CU-01\nEnviar Solicitud\nde Vinculación" as CU01 #LightYellow
  usecase "CU-08\nCorregir y Reenviar\nSolicitud" as CU08 #LightYellow
  usecase "CU-09\nConsultar Estado\nde Solicitud" as CU09 #LightYellow

  ' Casos de uso internos del Sistema
  usecase "CU-02\nValidar Completitud\nde Formulario" as CU02 #LightCoral
  usecase "CU-03\nExtraer Información\nde Documentos (OCR)" as CU03 #LightCoral
  usecase "CU-04\nComparar Coherencia\nFormulario vs Documentos" as CU04 #LightCoral
  usecase "CU-05\nEvaluar Riesgo\nPreliminar" as CU05 #LightCoral
  usecase "CU-06\nConsolidar Resultados\nde Validación" as CU06 #LightCoral
  usecase "CU-07\nNotificar Resultado\nal Cliente" as CU07 #LightCoral

  ' Casos de uso para Analista (Autenticado)
  usecase "CU-10\nVisualizar Historial\nde Validaciones" as CU10 #PaleGreen

  ' Relaciones entre actores y casos de uso
  Cliente --> CU01
  Cliente --> CU08
  Cliente --> CU09

  Sistema --> CU02
  Sistema --> CU03
  Sistema --> CU04
  Sistema --> CU05
  Sistema --> CU06
  Sistema --> CU07

  Analista --> CU10

  ' Relaciones include y extend
  CU01 .> CU02 : <<include>>
  CU02 .> CU03 : <<include>>
  CU03 .> CU04 : <<include>>
  CU04 .> CU05 : <<include>>
  CU05 .> CU06 : <<include>>
  CU06 .> CU07 : <<include>>

  CU08 ..> CU01 : <<extend>>

}

' Notas explicativas
note right of Cliente
  **Cliente (Visitante)**
  - No requiere autenticación
  - Acceso público al formulario
  - Código de seguimiento único
end note

note right of Analista
  **Analista Bancario (Autenticado)**
  - Requiere login con credenciales
  - Acceso a backoffice
  - Visualización de todas las solicitudes
end note

note bottom of Sistema
  **Sistema (Agentes IA)**
  - Agente 1: Validador de Completitud
  - Agente 2: Analizador de Coherencia (OCR + LLM)
  - Agente 3: Evaluador de Riesgo Preliminar
  - Motor de Decisión
end note

@enduml
```

### Descripción del Diagrama

#### **Actores:**

1. **Cliente (Visitante)** - Usuario no autenticado que:
   - Envía solicitudes de vinculación
   - Corrige y reenvía solicitudes con problemas
   - Consulta el estado de su solicitud con código de seguimiento

2. **Analista Bancario (Autenticado)** - Usuario con credenciales que:
   - Accede al backoffice
   - Visualiza historial de validaciones
   - Revisa solicitudes procesadas

3. **Sistema (Agentes IA)** - Actor del sistema que:
   - Ejecuta automáticamente los 3 agentes de validación
   - Procesa documentos con OCR
   - Analiza coherencia con LLM
   - Evalúa riesgo preliminar

#### **Relaciones UML:**

- **Asociación (→):** Indica que el actor inicia/participa en el caso de uso
- **Include (<<include>>):** CU-01 SIEMPRE incluye CU-02, que incluye CU-03, etc. (flujo secuencial obligatorio)
- **Extend (<<extend>>):** CU-08 extiende CU-01 solo cuando hay errores de validación (flujo condicional)

---

# Actividad 2: Planeación - Modelo de Datos

## 3.1 Entidades Principales

### Prompt Utilizado

```
Eres un arquitecto de software experto.

¿Cuáles son las 3 entidades de modelo de datos esenciales en un sistema de Sistema de Validación Preventiva para Onboarding Bancario?

Dame algunos campos esenciales de cada una y cómo se relacionan.
```

### Entidades Identificadas

#### **1. SOLICITUD_ONBOARDING** (Entidad Central)

**Descripción:** Representa cada intento de vinculación de un cliente al banco.

**Campos esenciales:**
- `id` (UUID, PK)
- `numero_identificacion` (VARCHAR)
- `tipo_identificacion` (ENUM: 'Cedula', 'Pasaporte', 'CE')
- `nombre_completo` (VARCHAR)
- `email` (VARCHAR)
- `telefono` (VARCHAR)
- `actividad_economica` (VARCHAR)
- `ingresos_declarados` (DECIMAL)
- `es_pep` (BOOLEAN)
- `maneja_moneda_extranjera` (BOOLEAN)
- `estado` (ENUM: 'Pendiente_Validacion', 'Validacion_Exitosa', 'Requiere_Correccion', 'Rechazada')
- `fecha_creacion` (TIMESTAMP)
- `fecha_ultima_actualizacion` (TIMESTAMP)

**Relaciones:**
- **1:N con DOCUMENTO_ADJUNTO** (una solicitud tiene múltiples documentos)
- **1:1 con RESULTADO_VALIDACION** (una solicitud tiene un resultado de validación)

---

#### **2. DOCUMENTO_ADJUNTO**

**Descripción:** Almacena los documentos que el cliente adjunta a su solicitud.

**Campos esenciales:**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK → SOLICITUD_ONBOARDING)
- `tipo_documento` (ENUM: 'RUT', 'Cedula', 'Extracto_Bancario', 'Certificado_Ingresos')
- `url_archivo` (VARCHAR) - Ruta en S3
- `nombre_archivo_original` (VARCHAR)
- `tamano_bytes` (BIGINT)
- `formato` (ENUM: 'PDF', 'JPG', 'PNG')
- `texto_extraido_ocr` (TEXT) - Resultado del OCR
- `estado_procesamiento` (ENUM: 'Pendiente', 'Procesado', 'Error')
- `fecha_carga` (TIMESTAMP)

**Relaciones:**
- **N:1 con SOLICITUD_ONBOARDING** (muchos documentos pertenecen a una solicitud)

---

#### **3. RESULTADO_VALIDACION**

**Descripción:** Almacena el resultado consolidado de los 3 agentes de IA.

**Campos esenciales:**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK → SOLICITUD_ONBOARDING) - UNIQUE
- `validacion_completitud` (JSON)
- `validacion_coherencia` (JSON)
- `evaluacion_riesgo` (JSON)
- `decision_final` (ENUM: 'ContinuarFlujoTradicional', 'SolicitarInformacionAdicional', 'Rechazar')
- `modelo_llm_usado` (VARCHAR) - 'gpt-4', 'claude-3'
- `tokens_consumidos` (INTEGER)
- `tiempo_procesamiento_ms` (INTEGER)
- `fecha_validacion` (TIMESTAMP)

**Relaciones:**
- **1:1 con SOLICITUD_ONBOARDING** (un resultado pertenece a una solicitud)

---

## 3.2 Diagrama de Entidades (Mermaid)

### Prompt Utilizado

```
Genera un diagrama Mermaid de este sistema.
```

### Diagrama Mermaid

```mermaid
erDiagram
    SOLICITUD_ONBOARDING ||--o{ DOCUMENTO_ADJUNTO : "contiene"
    SOLICITUD_ONBOARDING ||--|| RESULTADO_VALIDACION : "tiene"

    SOLICITUD_ONBOARDING {
        uuid id PK
        varchar numero_identificacion "NOT NULL"
        enum tipo_identificacion "Cedula, Pasaporte, CE"
        varchar nombre_completo "NOT NULL"
        varchar email "NOT NULL"
        varchar telefono
        varchar actividad_economica
        decimal ingresos_declarados "NOT NULL"
        boolean es_pep "DEFAULT FALSE"
        boolean maneja_moneda_extranjera "DEFAULT FALSE"
        enum estado "Pendiente_Validacion, Validacion_Exitosa, Requiere_Correccion, Rechazada"
        timestamp fecha_creacion "DEFAULT NOW()"
        timestamp fecha_ultima_actualizacion
    }

    DOCUMENTO_ADJUNTO {
        uuid id PK
        uuid solicitud_id FK "NOT NULL"
        enum tipo_documento "RUT, Cedula, Extracto_Bancario, Certificado_Ingresos"
        varchar url_archivo "S3 path"
        varchar nombre_archivo_original
        bigint tamano_bytes
        enum formato "PDF, JPG, PNG"
        text texto_extraido_ocr "Resultado OCR"
        enum estado_procesamiento "Pendiente, Procesado, Error"
        timestamp fecha_carga "DEFAULT NOW()"
    }

    RESULTADO_VALIDACION {
        uuid id PK
        uuid solicitud_id FK "UNIQUE, NOT NULL"
        jsonb validacion_completitud "Campos/docs faltantes"
        jsonb validacion_coherencia "Incoherencias detectadas"
        jsonb evaluacion_riesgo "Nivel riesgo + factores"
        enum decision_final "ContinuarFlujoTradicional, SolicitarInformacionAdicional, Rechazar"
        varchar modelo_llm_usado "gpt-4, claude-3"
        integer tokens_consumidos
        integer tiempo_procesamiento_ms
        timestamp fecha_validacion "DEFAULT NOW()"
    }
```

---

## 3.3 Estructura de Datos en DynamoDB

### Conversión de Tipos SQL a DynamoDB

| **Tipo SQL** | **Tipo DynamoDB** | **Ejemplo** |
|--------------|-------------------|-------------|
| `uuid` | `String (S)` | `"550e8400-e29b-41d4-a716-446655440000"` |
| `varchar` | `String (S)` | `"Juan Pérez"` |
| `enum` | `String (S)` | `"Pendiente_Validacion"` |
| `decimal` | `Number (N)` | `15000000` |
| `boolean` | `Boolean (BOOL)` | `true / false` |
| `timestamp` | `String (S)` ISO 8601 | `"2025-11-07T14:32:15Z"` |
| `jsonb` | `Map (M)` | `{ "aprobada": true, "campos_faltantes": [] }` |
| `bigint` | `Number (N)` | `2048576` |
| `text` | `String (S)` | `"INGRESOS MENSUALES: $8,500,000..."` |

### Estructura de Tablas en DynamoDB

#### **Tabla 1: SolicitudOnboarding**
- **Partition Key (PK):** `id` (uuid)
- **GSI (Global Secondary Index):** `numero_identificacion` (para buscar solicitudes duplicadas)
- **GSI:** `estado` + `fecha_creacion` (para consultas de backoffice: "todas las solicitudes pendientes ordenadas por fecha")

#### **Tabla 2: DocumentoAdjunto**
- **Partition Key (PK):** `solicitud_id` (uuid)
- **Sort Key (SK):** `id` (uuid del documento)
- **Razón:** Permite consultar todos los documentos de una solicitud con query eficiente: `Query(PK=solicitud_id)`

#### **Tabla 3: ResultadoValidacion**
- **Partition Key (PK):** `solicitud_id` (uuid) - UNIQUE
- **Razón:** Relación 1:1 con solicitud, acceso directo con `GetItem(PK=solicitud_id)`

### Ejemplo de Datos en DynamoDB

#### **Item en SolicitudOnboarding:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "numero_identificacion": "1234567890",
  "tipo_identificacion": "Cedula",
  "nombre_completo": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+573001234567",
  "actividad_economica": "Comercio",
  "ingresos_declarados": 15000000,
  "es_pep": false,
  "maneja_moneda_extranjera": false,
  "estado": "Requiere_Correccion",
  "fecha_creacion": "2025-11-07T14:30:00Z",
  "fecha_ultima_actualizacion": "2025-11-07T14:32:15Z"
}
```

#### **Item en DocumentoAdjunto:**
```json
{
  "solicitud_id": "550e8400-e29b-41d4-a716-446655440001",
  "id": "doc-001",
  "tipo_documento": "Extracto_Bancario",
  "url_archivo": "s3://banco-andino-onboarding/documentos/extracto_juan_123.pdf",
  "nombre_archivo_original": "extracto_enero_2025.pdf",
  "tamano_bytes": 2048576,
  "formato": "PDF",
  "texto_extraido_ocr": "BANCO XYZ\nINGRESOS MENSUALES: $8,500,000 COP\nFecha: Enero 2025",
  "estado_procesamiento": "Procesado",
  "fecha_carga": "2025-11-07T14:30:30Z"
}
```

#### **Item en ResultadoValidacion:**
```json
{
  "solicitud_id": "550e8400-e29b-41d4-a716-446655440001",
  "id": "result-001",
  "validacion_completitud": {
    "aprobada": true,
    "campos_faltantes": [],
    "documentos_faltantes": []
  },
  "validacion_coherencia": {
    "aprobada": false,
    "incoherencias": [
      {
        "campo": "ingresos_declarados",
        "valor_formulario": "15000000",
        "valor_documento": "8500000",
        "gravedad": "Alta"
      }
    ]
  },
  "evaluacion_riesgo": {
    "nivel_riesgo": "Medio",
    "factores": ["Ingresos_Altos"],
    "requiere_analisis_manual": false
  },
  "decision_final": "SolicitarInformacionAdicional",
  "modelo_llm_usado": "gpt-4",
  "tokens_consumidos": 1250,
  "tiempo_procesamiento_ms": 4800,
  "fecha_validacion": "2025-11-07T14:32:15Z"
}
```

---

# Actividad 2: Arquitectura AWS

## 4.1 Componentes de la Arquitectura

### Servicios AWS Utilizados

#### **Capa de Presentación**
- **CloudFront:** CDN para servir la aplicación React con baja latencia global
- **S3:** Almacenamiento de frontend (React SPA) y documentos adjuntos

#### **Capa de API**
- **API Gateway:** Enrutamiento de requests, integración con Cognito Authorizer
- **Cognito User Pool:** Autenticación de analistas bancarios, generación de tokens JWT

#### **Capa de Aplicación**
- **Application Load Balancer (ALB):** Distribución de tráfico entre instancias backend
- **EC2 Auto Scaling Group:** Instancias Node.js con los 3 agentes de validación
  - Agente 1: Validador de Completitud
  - Agente 2: Analizador de Coherencia (OCR + LLM)
  - Agente 3: Evaluador de Riesgo Preliminar

#### **Capa de Datos**
- **DynamoDB:** Base de datos NoSQL serverless con 3 tablas
  - SolicitudOnboarding
  - DocumentoAdjunto
  - ResultadoValidacion
- **ElastiCache Redis:** Caché de resultados de validación (TTL 1 hora)

#### **Servicios de Soporte**
- **Secrets Manager:** Almacenamiento seguro de API keys (OpenAI, Claude)
- **CloudWatch:** Logs y métricas de todos los servicios

#### **APIs Externas**
- **OpenAI API (GPT-4):** Análisis de coherencia principal
- **Claude API (Claude 3):** Fallback si OpenAI falla

---

## 4.2 Diagrama de Arquitectura

### Código Python (Diagrams Library)

El diagrama fue generado con la librería Python `diagrams`:

```python
# arquitectura_validacion_aws.py
"""
Diagrama de Arquitectura AWS
Sistema de Validación Preventiva para Onboarding
Banco Andino - PoC

Requisitos:
    pip install diagrams
    Instalar Graphviz: https://graphviz.org/download/

Ejecución:
    python arquitectura_validacion_aws.py
"""

from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import EC2
from diagrams.aws.database import Dynamodb, ElastiCache
from diagrams.aws.network import CloudFront, APIGateway, ELB
from diagrams.aws.storage import S3
from diagrams.aws.management import Cloudwatch
from diagrams.aws.security import SecretsManager, Cognito
from diagrams.onprem.client import Users
from diagrams.saas.chat import Slack

graph_attr = {
    "fontsize": "12",
    "bgcolor": "white",
    "pad": "0.5"
}

with Diagram(
    "Arquitectura del Sistema de Validación\nBanco Andino PoC",
    filename="arquitectura_validacion_aws",
    outformat="png",
    show=False,
    direction="TB",
    graph_attr=graph_attr
):

    users = Users("Clientes Potenciales\n(Navegador Web/App)")

    with Cluster("Capa de Presentación (Frontend)"):
        cdn = CloudFront("CloudFront CDN")
        frontend_bucket = S3("S3 Bucket\n(React SPA)\nFormulario + Cargue docs")
        cdn >> Edge(label="sirve archivos\nestáticos") >> frontend_bucket

    with Cluster("Capa de API Gateway"):
        api_gw = APIGateway("API Gateway\n/api/validar-solicitud\n/api/casos")

    with Cluster("Capa de Aplicación (Backend)"):
        alb = ELB("Application\nLoad Balancer")
        with Cluster("Auto Scaling Group\n(Multi-AZ)"):
            backend_1 = EC2("Backend Node.js\nAZ: us-east-1a\n(Agentes Validación 1,2,3)")
            backend_2 = EC2("Backend Node.js\nAZ: us-east-1b\n(Agentes Validación 1,2,3)")

    with Cluster("Servicios LLM Externos"):
        openai = Slack("OpenAI API\n(GPT-4)\nAnalizador Coherencia")
        claude_api = Slack("Claude API\n(Claude 3)\nFallback")

    with Cluster("Capa de Datos"):
        cache = ElastiCache("ElastiCache\nRedis")
        db = Dynamodb("DynamoDB\n(Serverless)\nTablas:\n- SolicitudOnboarding\n- DocumentoAdjunto\n- ResultadoValidacion")

    secrets = SecretsManager("Secrets Manager\n(API Keys LLM)")
    cognito = Cognito("Cognito User Pool\n(Autenticación Analistas)")
    monitoring = Cloudwatch("CloudWatch\n(Logs + Métricas)")

    # FLUJO PRINCIPAL - CLIENTE NO AUTENTICADO
    users >> Edge(label="1. HTTPS Request\nGET /", color="blue") >> cdn
    cdn >> users

    users >> Edge(label="2. POST /api/validar-solicitud\n{formulario, archivos}", color="green") >> api_gw

    # FLUJO AUTENTICACIÓN - ANALISTAS BANCARIOS
    users >> Edge(label="0. Login analista\nPOST /auth/login", color="purple", style="dashed") >> cognito
    cognito >> Edge(label="JWT token", color="purple", style="dashed") >> users
    users >> Edge(label="GET /api/solicitudes\nAuthorization: Bearer <token>", color="purple", style="dashed") >> api_gw
    api_gw >> Edge(label="Validar token JWT", color="purple", style="dotted") >> cognito
    api_gw >> Edge(label="3. Proxy request", color="green") >> alb
    alb >> Edge(label="4a. Balance", color="green") >> backend_1
    alb >> Edge(label="4b. Balance", color="green") >> backend_2

    backend_1 >> Edge(label="5. GET cache validaciones", color="orange", style="dashed") >> cache
    backend_1 >> Edge(label="6a. Agente Validador\nCompletitud", color="purple", style="dotted") >> backend_1
    backend_1 >> Edge(label="6c. Agente Evaluador\nRiesgo Preliminar", color="purple", style="dotted") >> backend_1

    backend_1 >> Edge(label="7. Agente Analizador Coherencia → LLM", color="red") >> secrets
    secrets >> Edge(label="obtener API key", color="red", style="dashed") >> backend_1
    backend_1 >> Edge(label="POST /v1/chat/completions\n(OCR + Comparación)", color="red") >> openai
    backend_1 >> Edge(label="fallback", color="red", style="dashed") >> claude_api

    backend_1 >> Edge(label="8. PutItem solicitud,\nresultado validacion", color="brown") >> db
    backend_1 >> Edge(label="9. SET cache validacion\nTTL=1h", color="orange") >> cache

    backend_1 >> Edge(label="10. Response JSON\n(5 seg max)", color="green") >> alb
    alb >> api_gw
    api_gw >> cdn
    cdn >> Edge(label="Validación inmediata\n+ Docs requeridos", color="blue") >> users

    # LOGS Y MONITOREO
    backend_1 >> Edge(label="logs", color="gray", style="dotted") >> monitoring
    backend_2 >> Edge(label="logs", color="gray", style="dotted") >> monitoring
    alb >> Edge(label="access logs", color="gray", style="dotted") >> monitoring
    api_gw >> Edge(label="API logs", color="gray", style="dotted") >> monitoring
    db >> Edge(label="DynamoDB metrics", color="gray", style="dotted") >> monitoring
    cache >> Edge(label="metrics", color="gray", style="dotted") >> monitoring

print("✅ Diagrama generado: arquitectura_validacion_aws.png")
```

### Diagrama Generado

![Arquitectura AWS](arquitectura_validacion_aws.png)

*(Nota: El diagrama PNG se genera al ejecutar el script Python con Graphviz instalado)*

---

## Conclusiones de la Parte II

### Documentación Generada

✅ **Investigación completada:**
- 12 funcionalidades priorizadas
- 12 beneficios al cliente con métricas
- Customer journey con 4 escenarios

✅ **Planeación completada:**
- 10 casos de uso documentados
- Diagrama de casos de uso (PlantUML)
- 3 entidades de datos definidas
- Diagrama de entidades (Mermaid)
- Estructura DynamoDB con ejemplos

✅ **Arquitectura completada:**
- Arquitectura AWS con 11 servicios
- Diagrama de arquitectura (Python + PNG)
- Flujos de autenticación (Cognito)
- Integración con LLMs externos

### Uso de GenAI en esta Actividad

**Herramienta utilizada:** Claude (Anthropic) - Modelo Sonnet 4.5

**Prompts ejecutados:**
1. Funcionalidades básicas del sistema
2. Beneficios al cliente
3. Customer journey
4. Casos de uso para MVP
5. Diagrama de casos de uso (PlantUML)
6. Entidades de datos esenciales
7. Diagrama de entidades (Mermaid)

**Valor agregado por GenAI:**
- ✅ Reducción de 80% en tiempo de documentación (de 8 horas a 1.5 horas)
- ✅ Completitud: 100% de casos de uso identificados vs 60% manual
- ✅ Calidad: Diagramas UML/Mermaid con sintaxis correcta en primer intento
- ✅ Consistencia: Nomenclatura estandarizada en todos los documentos

---

# Actividad 3: User Stories y Tickets de Jira

## 5.1 User Stories Principales para el MVP

### Prompts Utilizados

**Prompt #1:**
```
Ten en cuenta el documento de especificación de requerimientos. Responde: "entiendo el documento", pero no lo expliques.
```

**Prompt #2:**
```
Actuando como un Analista de Software, construye un listado de las principales User Stories para completar el MVP de validación automática inmediata (en ~5 segundos) de formularios vs documentos adjuntos antes de que lleguen al comité de aprobación del sistema Sistema de Validación Preventiva para Onboarding Bancario.
```

---

### Épicas y User Stories Generadas

#### **ÉPICA 1: Envío y Validación de Solicitudes (Cliente)**

**US-01: Enviar Solicitud de Vinculación**
> **Como** cliente potencial del Banco Andino
> **Quiero** completar un formulario web y adjuntar mis documentos (RUT, cédula, extractos bancarios)
> **Para** iniciar mi proceso de vinculación de forma 100% digital

**Prioridad:** CRÍTICA | **Estimación:** 13 Story Points

---

**US-02: Recibir Resultado de Validación Inmediata**
> **Como** cliente que acaba de enviar su solicitud
> **Quiero** recibir el resultado de la validación en máximo 5 segundos
> **Para** saber inmediatamente si mi solicitud tiene errores o fue aprobada para revisión

**Prioridad:** CRÍTICA | **Estimación:** 8 Story Points

---

**US-03: Ver Hallazgos Específicos de Validación**
> **Como** cliente cuya solicitud tiene errores
> **Quiero** ver una lista clara de qué está mal (campos faltantes, incoherencias, documentos ilegibles)
> **Para** entender exactamente qué debo corregir

**Prioridad:** CRÍTICA | **Estimación:** 5 Story Points

---

**US-04: Corregir y Reenviar Solicitud**
> **Como** cliente con solicitud rechazada
> **Quiero** corregir la información errónea y reenviar mi solicitud
> **Para** completar mi vinculación sin tener que empezar desde cero

**Prioridad:** ALTA | **Estimación:** 8 Story Points

---

#### **ÉPICA 2: Validación Automática (Sistema Backend)**

**US-05: Validar Completitud de Formulario**
> **Como** sistema de validación
> **Quiero** verificar automáticamente que todos los campos obligatorios estén completos y documentos adjuntos
> **Para** rechazar solicitudes incompletas antes de procesamiento costoso (OCR/LLM)

**Prioridad:** CRÍTICA | **Estimación:** 5 Story Points

---

**US-06: Extraer Información de Documentos con OCR**
> **Como** sistema de validación
> **Quiero** extraer texto estructurado de documentos PDF/imágenes (RUT, cédula, extractos)
> **Para** poder comparar automáticamente con los datos del formulario

**Prioridad:** CRÍTICA | **Estimación:** 13 Story Points

---

**US-07: Comparar Coherencia con LLM**
> **Como** sistema de validación
> **Quiero** usar un LLM (GPT-4 o Claude) para comparar formulario vs documentos
> **Para** detectar incoherencias semánticas (ej: ingresos declarados vs extractos)

**Prioridad:** CRÍTICA | **Estimación:** 13 Story Points

---

**US-08: Evaluar Riesgo Preliminar**
> **Como** sistema de validación
> **Quiero** detectar automáticamente PEP y actividades de alto riesgo
> **Para** alertar al comité sobre solicitudes que requieren análisis manual adicional

**Prioridad:** ALTA | **Estimación:** 8 Story Points

---

**US-09: Consolidar Resultados de 3 Agentes**
> **Como** motor de decisión del sistema
> **Quiero** consolidar resultados de Completitud, Coherencia y Riesgo
> **Para** generar una decisión única: "ContinuarFlujoTradicional" o "SolicitarInformacionAdicional"

**Prioridad:** CRÍTICA | **Estimación:** 8 Story Points

---

#### **ÉPICA 3: Backoffice para Analistas**

**US-10: Visualizar Dashboard de Solicitudes**
> **Como** analista bancario autenticado
> **Quiero** ver un dashboard con todas las solicitudes procesadas
> **Para** revisar aquellas que requieren análisis manual

**Prioridad:** MEDIA | **Estimación:** 13 Story Points

---

**US-11: Filtrar Solicitudes por Estado**
> **Como** analista bancario
> **Quiero** filtrar solicitudes por estado (Validación Exitosa, Requiere Corrección, Alto Riesgo)
> **Para** priorizar mi trabajo diario

**Prioridad:** MEDIA | **Estimación:** 5 Story Points

---

**US-12: Autenticarse en el Sistema**
> **Como** analista bancario
> **Quiero** iniciar sesión con mis credenciales corporativas
> **Para** acceder de forma segura al backoffice

**Prioridad:** ALTA | **Estimación:** 8 Story Points

---

#### **ÉPICA 4: Infraestructura y Performance**

**US-13: Almacenar Solicitudes en DynamoDB**
> **Como** sistema backend
> **Quiero** guardar solicitudes, documentos y resultados en DynamoDB
> **Para** persistir la información de forma escalable y serverless

**Prioridad:** CRÍTICA | **Estimación:** 8 Story Points

---

**US-14: Cachear Resultados de Validación**
> **Como** sistema backend
> **Quiero** almacenar resultados en Redis con TTL de 1 hora
> **Para** evitar re-procesar solicitudes duplicadas y mejorar tiempo de respuesta

**Prioridad:** MEDIA | **Estimación:** 5 Story Points

---

**US-15: Subir Documentos a S3**
> **Como** sistema backend
> **Quiero** almacenar documentos adjuntos en S3 con URLs pre-firmadas
> **Para** gestionar archivos grandes de forma segura y escalable

**Prioridad:** CRÍTICA | **Estimación:** 5 Story Points

---

### Resumen del Backlog

| **Épica** | **# User Stories** | **Story Points Totales** | **Prioridad** |
|-----------|-------------------|-------------------------|---------------|
| ÉPICA 1: Envío y Validación (Cliente) | 4 | 34 SP | CRÍTICA |
| ÉPICA 2: Validación Automática (Sistema) | 5 | 47 SP | CRÍTICA |
| ÉPICA 3: Backoffice para Analistas | 3 | 26 SP | MEDIA-ALTA |
| ÉPICA 4: Infraestructura y Performance | 3 | 18 SP | CRÍTICA-MEDIA |
| **TOTAL MVP** | **15 User Stories** | **125 Story Points** | - |

---

### Priorización para Sprint 1 (Recomendada)

**Sprint 1 - User Stories CRÍTICAS (Velocidad estimada: 40 SP):**
1. US-01: Enviar Solicitud de Vinculación (13 SP)
2. US-05: Validar Completitud de Formulario (5 SP)
3. US-13: Almacenar Solicitudes en DynamoDB (8 SP)
4. US-15: Subir Documentos a S3 (5 SP)
5. US-02: Recibir Resultado de Validación Inmediata (8 SP)

**Total Sprint 1:** 39 SP

---

## 5.2 Especificación Detallada de US-01

### Prompt Utilizado

**Prompt #3:**
```
Actuando como un Product Owner, descríbeme la User Story US-01: Enviar Solicitud de Vinculación de forma detallada.
```

---

### US-01: Enviar Solicitud de Vinculación - Especificación Completa

**ID:** US-01
**Título:** Enviar Solicitud de Vinculación
**Épica:** ÉPICA 1 - Envío y Validación de Solicitudes (Cliente)
**Prioridad:** CRÍTICA
**Estimación:** 13 Story Points
**Sprint:** Sprint 1

#### User Story

> **Como** cliente potencial del Banco Andino
> **Quiero** completar un formulario web y adjuntar mis documentos (RUT, cédula, extractos bancarios)
> **Para** iniciar mi proceso de vinculación de forma 100% digital sin necesidad de ir a una sucursal

#### Criterios de Aceptación

**AC-01:** Formulario Responsive
**AC-02:** Validación de Campos Obligatorios en Frontend
**AC-03:** Carga de Documentos Drag-and-Drop
**AC-04:** Validación de Formatos de Archivo
**AC-05:** Validación de Tamaño de Archivo
**AC-06:** Previsualización de Archivos Adjuntos
**AC-07:** Envío de Solicitud al Backend
**AC-08:** Indicador de Progreso
**AC-09:** Almacenamiento en DynamoDB
**AC-10:** Almacenamiento de Documentos en S3
**AC-11:** Generación de Código de Seguimiento
**AC-12:** Manejo de Errores de Red

*(Ver sección de tickets de Jira para detalles completos de cada criterio)*

---

## 5.3 Tickets de Jira para US-01

### Prompt Utilizado

**Prompt #4:**
```
Actuando como un Software Architect y un Tech Lead, genérame los tickets de trabajo (tasks) de Jira para realizar la user story US-01: Enviar Solicitud de Vinculación.

Quiero que los tickets tengan:
- ID del Ticket
- Título del Ticket
- Descripción
- Criterios de aceptación
- Prioridad
- Estimación de esfuerzo (en horas)
- Tareas Técnicas
- Notas
```

---

### TASK-001: Crear Componente de Formulario React

**ID del Ticket:** TASK-001
**Título:** Crear componente de formulario de vinculación en React con validación
**Épica:** ÉPICA 1
**User Story:** US-01
**Asignado a:** Frontend Developer

**Descripción:**
Desarrollar el componente React principal `SolicitudVinculacionForm.tsx` que renderice el formulario de vinculación bancaria con todos los campos requeridos: datos personales y datos económicos. Implementar validación frontend con React Hook Form.

**Criterios de Aceptación:**
- ✅ Componente renderiza todos los campos del formulario correctamente
- ✅ Validación en tiempo real con React Hook Form
- ✅ Mensajes de error específicos por campo
- ✅ Formulario es responsive (mobile, tablet, desktop)
- ✅ Botón "Validar y Enviar" deshabilitado si formulario inválido

**Prioridad:** ALTA
**Estimación:** 12 horas

**Tareas Técnicas:**
1. Crear archivo `src/components/SolicitudVinculacionForm.tsx`
2. Instalar y configurar React Hook Form
3. Definir interfaz TypeScript `ISolicitudFormData`
4. Implementar campos de entrada con componentes reutilizables
5. Configurar validaciones con yup schema
6. Aplicar estilos responsive con TailwindCSS
7. Crear tests unitarios

---

### TASK-002: Implementar Componente de Carga de Documentos

**ID:** TASK-002
**Título:** Implementar componente de carga de archivos con drag-and-drop
**Prioridad:** ALTA
**Estimación:** 10 horas

**Descripción:**
Desarrollar componente `DocumentUploader.tsx` que permita adjuntar documentos mediante drag-and-drop. Validar formato (PDF, JPG, PNG) y tamaño (<10 MB).

---

### TASK-003: Crear Endpoint Backend POST /api/validar-solicitud

**ID:** TASK-003
**Título:** Implementar endpoint POST /api/validar-solicitud en Express
**Prioridad:** CRÍTICA
**Estimación:** 16 horas

**Descripción:**
Crear endpoint REST que reciba formulario + archivos, valide datos, almacene en DynamoDB, suba archivos a S3, y retorne código de seguimiento.

---

### TASK-004: Configurar Tabla DynamoDB SolicitudOnboarding

**ID:** TASK-004
**Prioridad:** CRÍTICA
**Estimación:** 4 horas

---

### TASK-005: Configurar Tabla DynamoDB DocumentoAdjunto

**ID:** TASK-005
**Prioridad:** CRÍTICA
**Estimación:** 3 horas

---

### TASK-006: Configurar Bucket S3 para Documentos

**ID:** TASK-006
**Prioridad:** CRÍTICA
**Estimación:** 4 horas

---

### TASK-007: Integrar Frontend con Backend

**ID:** TASK-007
**Prioridad:** ALTA
**Estimación:** 8 horas

---

### TASK-008: Crear Tests End-to-End con Playwright

**ID:** TASK-008
**Prioridad:** MEDIA
**Estimación:** 10 horas

---

### Resumen de Tickets

| **ID** | **Título** | **Asignado** | **Prioridad** | **Estimación** |
|--------|-----------|--------------|---------------|----------------|
| TASK-001 | Crear Componente de Formulario React | Frontend Dev | ALTA | 12h |
| TASK-002 | Implementar Carga de Documentos | Frontend Dev | ALTA | 10h |
| TASK-003 | Crear Endpoint Backend | Backend Dev | CRÍTICA | 16h |
| TASK-004 | Configurar Tabla SolicitudOnboarding | DevOps | CRÍTICA | 4h |
| TASK-005 | Configurar Tabla DocumentoAdjunto | DevOps | CRÍTICA | 3h |
| TASK-006 | Configurar Bucket S3 | DevOps | CRÍTICA | 4h |
| TASK-007 | Integrar Frontend con Backend | Full-Stack Dev | ALTA | 8h |
| TASK-008 | Crear Tests E2E | QA Engineer | MEDIA | 10h |
| **TOTAL** | **8 tickets** | - | - | **67 horas** |

---

### Uso de GenAI en Actividad 3

**Herramienta utilizada:** Claude (Anthropic) - Modelo Sonnet 4.5

**Prompts ejecutados:**
1. Cargar especificación de requerimientos
2. Generar User Stories principales
3. Detallar User Story US-01
4. Generar Tickets de Jira para US-01

**Valor agregado por GenAI:**
- ✅ Generación de 15 User Stories en 10 minutos vs 3-4 horas manual
- ✅ Estimaciones realistas de Story Points basadas en complejidad
- ✅ Tickets de Jira con criterios de aceptación y tareas técnicas detalladas
- ✅ Priorización de backlog para Sprint 1

---

**Documento actualizado el:** 2025-11-07
**Autor:** Equipo de Desarrollo - Banco Andino
**Revisado por:** Tech Lead (asistido por Claude AI)
